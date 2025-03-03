const faker = require('faker');

// Sample list of high-risk countries (For AML)
const highRiskCountries = ['North Korea', 'Iran', 'Sudan', 'Syria', 'Afghanistan'];

// KYC Data Generation Function (For KYC)
function generateKYCData() {
  return {
    customerId: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    dateOfBirth: faker.date.past(30, '2000-01-01'),
    nationality: faker.address.country(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    identificationNumber: faker.datatype.number({ min: 1000000, max: 9999999 }).toString(),
    occupation: faker.name.jobTitle(),
    riskLevel: faker.random.arrayElement(['Low', 'Medium', 'High']),
  };
}

// AML Data Generation Function (For AML)
function generateAMLTransaction() {
  return {
    transactionId: faker.datatype.uuid(),
    senderId: faker.datatype.uuid(),
    receiverId: faker.datatype.uuid(),
    senderCountry: faker.address.country(),
    receiverCountry: faker.address.country(),
    amount: faker.finance.amount(100, 1000000, 2), // Amount in USD
    transactionDate: faker.date.past(1),
    transactionType: faker.random.arrayElement(['Deposit', 'Withdrawal', 'Transfer']),
    senderAccountHistory: faker.datatype.number({ min: 1, max: 10000 }),
    transactionStatus: 'Completed', // Can be 'Pending' or 'Completed'
  };
}

// Function to validate KYC Data
function validateKYC(kycData) {
  let validationResult = [];
  if (!kycData.firstName || !kycData.lastName || !kycData.dateOfBirth) {
    validationResult.push('Missing required customer identity information.');
  }

  if (!highRiskCountries.includes(kycData.nationality)) {
    validationResult.push('Customer nationality is not flagged as a high-risk country.');
  }

  if (kycData.riskLevel === 'High') {
    validationResult.push('Customer risk level is HIGH, further validation required.');
  }

  return validationResult.length ? validationResult : ['KYC data is valid.'];
}

// Function to validate AML Transactions
function validateAMLTransaction(transactionData, customerKYCData) {
  let validationResult = [];
  
  // 1. Check for large transactions (greater than $50,000)
  if (parseFloat(transactionData.amount) > 50000) {
    validationResult.push('Transaction exceeds $50,000, flagged for review.');
  }

  // 2. Check for cross-border transactions
  if (transactionData.senderCountry !== transactionData.receiverCountry) {
    validationResult.push('Cross-border transaction detected, flagged for review.');
  }

  // 3. Check for suspicious rapid transactions
  if (transactionData.senderAccountHistory > 1000) {
    validationResult.push('Multiple high-volume transactions detected in a short time.');
  }

  // 4. Check if the sender is from a high-risk country
  if (highRiskCountries.includes(transactionData.senderCountry)) {
    validationResult.push('Sender is from a high-risk country, flagged for review.');
  }

  // 5. Validate KYC data for suspicious activity
  const kycValidation = validateKYC(customerKYCData);
  if (kycValidation[0] !== 'KYC data is valid.') {
    validationResult.push('KYC validation failed. Issues found in customer data.');
    validationResult.push(...kycValidation);
  }

  return validationResult.length ? validationResult : ['Transaction passed AML validation.'];
}

// Sample Data Generation and Test Case Validation

// Generating sample KYC data
const customerKYCData = generateKYCData();

// Generating sample AML transaction data
const amlTransactionData = generateAMLTransaction();

// Testing KYC Validation
const kycValidationResult = validateKYC(customerKYCData);
console.log('KYC Validation Result:', kycValidationResult);

// Testing AML Transaction Validation
const amlValidationResult = validateAMLTransaction(amlTransactionData, customerKYCData);
console.log('AML Validation Result:', amlValidationResult);

// Test Case 1: Simulate large single transaction (greater than $50,000)
const largeTransaction = generateAMLTransaction();
largeTransaction.amount = '60000';  // Simulating a transaction > $50,000
const largeTransactionValidation = validateAMLTransaction(largeTransaction, customerKYCData);
console.log('Large Transaction Test Case:', largeTransactionValidation);

// Test Case 2: Simulate cross-border transaction
const crossBorderTransaction = generateAMLTransaction();
crossBorderTransaction.senderCountry = 'USA';
crossBorderTransaction.receiverCountry = 'Germany';
const crossBorderTransactionValidation = validateAMLTransaction(crossBorderTransaction, customerKYCData);
console.log('Cross Border Transaction Test Case:', crossBorderTransactionValidation);

// Test Case 3: Simulate rapid large transaction (multiple transactions)
const rapidTransaction = generateAMLTransaction();
rapidTransaction.senderAccountHistory = 1500;  // Simulating multiple large transactions in a short period
const rapidTransactionValidation = validateAMLTransaction(rapidTransaction, customerKYCData);
console.log('Rapid Large Transaction Test Case:', rapidTransactionValidation);

// Test Case 4: Suspicious source of funds from a high-risk country
const highRiskTransaction = generateAMLTransaction();
highRiskTransaction.senderCountry = 'North Korea';  // High-risk country
const highRiskTransactionValidation = validateAMLTransaction(highRiskTransaction, customerKYCData);
console.log('High-Risk Country Transaction Test Case:', highRiskTransactionValidation);


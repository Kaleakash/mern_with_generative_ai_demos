const faker = require('faker');
const fs = require('fs');

// Number of records to generate
const numRecords = 1000;

// Transaction types
const transactionTypes = ['Withdrawal', 'Deposit', 'Transfer'];

// Possible countries
const countries = ['USA', 'UK', 'India', 'Canada', 'Germany', 'Russia', 'China', 'Japan', 'Australia'];

// Generate synthetic AML test data
function generateSyntheticData(numRecords) {
    const data = [];

    for (let i = 0; i < numRecords; i++) {
        const transactionId = i + 1;
        const customerId = faker.datatype.number({ min: 1000, max: 9999 }); // Updated to faker.datatype.number
        const amount = faker.finance.amount(100, 1000000, 2);
        const transactionDate = faker.date.past(5);
        const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
        const senderCountry = countries[Math.floor(Math.random() * countries.length)];
        const receiverCountry = countries[Math.floor(Math.random() * countries.length)];
        const senderBank = faker.company.companyName();
        const receiverBank = faker.company.companyName();
        const accountBalance = faker.finance.amount(5000, 10000000, 2);
        const customerType = Math.random() > 0.5 ? 'Individual' : 'Business';

        // Suspicious Activity Logic (simple rule-based flag for large amounts)
        let suspiciousActivityFlag = 'No';
        let reasonForSuspicion = '';
        if (parseFloat(amount) > 50000) {
            suspiciousActivityFlag = 'Yes';
            reasonForSuspicion = 'Large transaction amount';
        } else if (transactionType === 'Transfer' && senderCountry !== receiverCountry) {
            suspiciousActivityFlag = 'Yes';
            reasonForSuspicion = 'Large cross-border transfer';
        }

        const transactionPurpose = ['Business payment', 'Personal transfer', 'Loan repayment'][Math.floor(Math.random() * 3)];

        // Append record to the data array
        data.push([
            transactionId,
            customerId,
            amount,
            transactionDate.toISOString(),
            transactionType,
            senderCountry,
            receiverCountry,
            senderBank,
            receiverBank,
            accountBalance,
            customerType,
            suspiciousActivityFlag,
            reasonForSuspicion,
            transactionPurpose
        ]);
    }

    return data;
}

// Generate the data
const amlData = generateSyntheticData(numRecords);

// Create a CSV file to store the data
const csvHeader = [
    'Transaction ID', 'Customer ID', 'Amount', 'Date', 'Transaction Type',
    'Sender Country', 'Receiver Country', 'Sender Bank', 'Receiver Bank',
    'Account Balance', 'Customer Type', 'Suspicious Activity Flag', 'Reason for Suspicion', 'Transaction Purpose'
].join(',') + '\n';

// Convert data to CSV format
const csvData = amlData.map(row => row.join(',')).join('\n');

// Write the CSV data to a file
fs.writeFileSync('aml_test_data.csv', csvHeader + csvData);

console.log('Synthetic AML test data generated and saved to aml_test_data.csv');

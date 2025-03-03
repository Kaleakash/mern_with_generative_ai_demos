const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

// Function to generate synthetic KYC data
function generateKycData(numberOfRecords) {
  const kycData = [];

  for (let i = 0; i < numberOfRecords; i++) {
    const data = {
      customerId: uuidv4(), // Generate a unique customer ID
      firstName: faker.name.firstName(), // Random first name
      lastName: faker.name.lastName(), // Random last name
      dateOfBirth: faker.date.past(30, new Date('2000-01-01')), // Random DOB
      address: {
        streetAddress: faker.address.streetAddress(), // Random street address
        city: faker.address.city(), // Random city
        state: faker.address.state(), // Random state
        zipCode: faker.address.zipCode(), // Random zip code
        country: faker.address.country() // Random country
      },
      phoneNumber: faker.phone.phoneNumber(), // Random phone number
      email: faker.internet.email(), // Random email
      nationality: faker.address.countryCode(), // Random nationality code
      document: {
        type: "Passport", // Document type
        number: faker.random.alphaNumeric(9).toUpperCase() // Random passport number
      },
      riskLevel: faker.random.arrayElement(['Low', 'Medium', 'High']), // Random risk level
      createdAt: faker.date.past(2), // Account creation date
      updatedAt: new Date() // Current date
    };

    kycData.push(data);
  }

  return kycData;
}

// Generate synthetic data for 10 customers
const syntheticKycData = generateKycData(10);

// Output the generated data to the console
console.log(JSON.stringify(syntheticKycData, null, 2));


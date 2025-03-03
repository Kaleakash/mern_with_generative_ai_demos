const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Function to generate a single customer record
const generateCustomer = () => {
    return {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country()
        },
        preferences: {
            preferredPaymentMethod: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay']),
            notifications: faker.helpers.arrayElement(['SMS', 'Email', 'Both', 'None']),
            language: faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German'])
        },
        orderHistory: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
            orderId: faker.string.uuid(),
            orderDate: faker.date.past(),
            orderTotal: faker.commerce.price({ min: 10, max: 500 }),
            items: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
                productId: faker.string.uuid(),
                productName: faker.commerce.productName(),
                price: faker.commerce.price(),
                quantity: faker.number.int({ min: 1, max: 5 })
            }))
        })),
        accountCreated: faker.date.past(),
        lastLogin: faker.date.recent()
    };
};

// Function to generate multiple customers
const generateCustomers = (count) => {
    const customers = [];
    for (let i = 0; i < count; i++) {
        customers.push(generateCustomer());
    }
    return customers;
};

// Generate 100 customers
const customerData = generateCustomers(100);

// Save to JSON file
fs.writeFileSync(
    'customer_test_data.json',
    JSON.stringify(customerData, null, 2),
    'utf-8'
);

console.log('Test data generated successfully!');

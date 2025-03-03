const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

// Import the functions from your main file
const {
    generateCategories,
    generateProduct,
    generateCustomer,
    generateTransaction,
    generateEcommerceData,
    verifyGeneratedData
} = require('./generateEcommerceData'); // Ensure you export these functions in your main file

describe('E-commerce Data Generator Tests', () => {
    // Test data directory
    const TEST_DATA_DIR = './test_data';

    // Clean up test data before and after tests
    beforeEach(() => {
        if (fs.existsSync(TEST_DATA_DIR)) {
            const files = fs.readdirSync(TEST_DATA_DIR);
            files.forEach(file => {
                fs.unlinkSync(path.join(TEST_DATA_DIR, file));
            });
            fs.rmdirSync(TEST_DATA_DIR);
        }
    });

    afterAll(() => {
        if (fs.existsSync(TEST_DATA_DIR)) {
            const files = fs.readdirSync(TEST_DATA_DIR);
            files.forEach(file => {
                fs.unlinkSync(path.join(TEST_DATA_DIR, file));
            });
            fs.rmdirSync(TEST_DATA_DIR);
        }
    });

    // Test Product Generation
    describe('Product Generation', () => {
        test('generateCategories should return an array of categories', () => {
            const categories = generateCategories();
            expect(Array.isArray(categories)).toBe(true);
            expect(categories.length).toBeGreaterThan(0);
            expect(categories).toContain('Smartphones');
        });

        test('generateProduct should create valid product object', () => {
            const categories = generateCategories();
            const product = generateProduct(categories);

            expect(product).toHaveProperty('productId');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
            expect(product.price).toHaveProperty('regular');
            expect(product.price).toHaveProperty('discounted');
            expect(product.price.discounted).toBeLessThanOrEqual(product.price.regular);
            expect(categories).toContain(product.category);
        });
    });

    // Test Customer Generation
    describe('Customer Generation', () => {
        test('generateCustomer should create valid customer object', () => {
            const customer = generateCustomer();

            expect(customer).toHaveProperty('customerId');
            expect(customer).toHaveProperty('firstName');
            expect(customer).toHaveProperty('lastName');
            expect(customer).toHaveProperty('email');
            expect(customer.email).toContain('@');
            expect(customer).toHaveProperty('address');
            expect(customer.address).toHaveProperty('street');
            expect(customer.address).toHaveProperty('city');
        });

        test('customer email should be properly formatted', () => {
            const customer = generateCustomer();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            expect(emailRegex.test(customer.email)).toBe(true);
        });
    });

    // Test Transaction Generation
    describe('Transaction Generation', () => {
        test('generateTransaction should create valid transaction object', () => {
            const categories = generateCategories();
            const products = [generateProduct(categories)];
            const customers = [generateCustomer()];
            const transaction = generateTransaction(customers, products);

            expect(transaction).toHaveProperty('transactionId');
            expect(transaction).toHaveProperty('orderId');
            expect(transaction).toHaveProperty('customerId');
            expect(transaction).toHaveProperty('items');
            expect(Array.isArray(transaction.items)).toBe(true);
        });

        test('transaction totals should be calculated correctly', () => {
            const categories = generateCategories();
            const products = [generateProduct(categories)];
            const customers = [generateCustomer()];
            const transaction = generateTransaction(customers, products);

            const calculatedSubtotal = transaction.items.reduce(
                (sum, item) => sum + (item.unitPrice * item.quantity),
                0
            );
            
            expect(transaction.billing.subtotal).toBeCloseTo(calculatedSubtotal, 2);
            expect(transaction.billing.total).toBeCloseTo(
                transaction.billing.subtotal + 
                transaction.billing.tax + 
                transaction.billing.shippingCost,
                2
            );
        });
    });

    // Test Complete Data Generation
    describe('Complete E-commerce Data Generation', () => {
        test('generateEcommerceData should create all required files', () => {
            const summary = generateEcommerceData(5, 10, 15);

            expect(fs.existsSync(TEST_DATA_DIR)).toBe(true);
            expect(fs.existsSync(`${TEST_DATA_DIR}/products.json`)).toBe(true);
            expect(fs.existsSync(`${TEST_DATA_DIR}/customers.json`)).toBe(true);
            expect(fs.existsSync(`${TEST_DATA_DIR}/transactions.json`)).toBe(true);
            expect(fs.existsSync(`${TEST_DATA_DIR}/summary.json`)).toBe(true);
        });

        test('generated data should have correct counts', () => {
            const summary = generateEcommerceData(5, 10, 15);

            const products = JSON.parse(
                fs.readFileSync(`${TEST_DATA_DIR}/products.json`)
            );
            const customers = JSON.parse(
                fs.readFileSync(`${TEST_DATA_DIR}/customers.json`)
            );
            const transactions = JSON.parse(
                fs.readFileSync(`${TEST_DATA_DIR}/transactions.json`)
            );

            expect(products.length).toBe(5);
            expect(customers.length).toBe(10);
            expect(transactions.length).toBe(15);
        });

        test('generated data should maintain referential integrity', () => {
            generateEcommerceData(5, 10, 15);

            const products = JSON.parse(
                fs.readFileSync(`${TEST_DATA_DIR}/products.json`)
            );
            const customers = JSON.parse(
                fs.readFileSync(`${TEST_DATA_DIR}/customers.json`)
            );
            const transactions = JSON.parse(
                fs.readFileSync(`${TEST_DATA_DIR}/transactions.json`)
            );

            const sampleTransaction = transactions[0];
            
            // Verify customer reference
            const customerExists = customers.some(
                c => c.customerId === sampleTransaction.customerId
            );
            expect(customerExists).toBe(true);

            // Verify product reference
            const productExists = products.some(
                p => p.productId === sampleTransaction.items[0].productId
            );
            expect(productExists).toBe(true);
        });
    });

    // Test Data Verification
    describe('Data Verification', () => {
        test('verifyGeneratedData should run without errors', () => {
            generateEcommerceData(5, 10, 15);
            expect(() => verifyGeneratedData()).not.toThrow();
        });
    });
});

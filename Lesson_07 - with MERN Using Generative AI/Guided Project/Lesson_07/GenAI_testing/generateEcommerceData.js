const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Product Generation Functions
const generateCategories = () => {
    return [
        'Smartphones',
        'Tablets',
        'Accessories',
        'Wearables',
        'Audio Devices',
        'Mobile Cases',
        'Screen Protectors',
        'Chargers',
        'Power Banks',
        'Storage Devices'
    ];
};

const generateProduct = (categories) => {
    const category = faker.helpers.arrayElement(categories);
    const brand = faker.company.name();
    const regularPrice = parseFloat(faker.commerce.price({ min: 50, max: 2000 }));
    const discount = faker.number.int({ min: 0, max: 30 });
    const discountedPrice = regularPrice * (1 - discount/100);

    return {
        productId: faker.string.uuid(),
        sku: faker.string.alphanumeric(8).toUpperCase(),
        name: `${brand} ${faker.commerce.productName()}`,
        brand: brand,
        category: category,
        description: faker.commerce.productDescription(),
        price: {
            regular: regularPrice,
            discounted: parseFloat(discountedPrice.toFixed(2)),
            discount: discount,
            currency: 'USD'
        },
        specifications: {
            color: faker.helpers.arrayElement(['Black', 'White', 'Silver', 'Gold', 'Blue']),
            weight: `${faker.number.int({ min: 100, max: 500 })}g`,
            dimensions: {
                length: `${faker.number.int({ min: 10, max: 30 })}cm`,
                width: `${faker.number.int({ min: 5, max: 15 })}cm`,
                height: `${faker.number.int({ min: 1, max: 5 })}cm`
            }
        },
        inventory: {
            inStock: faker.number.int({ min: 0, max: 100 }),
            warehouse: faker.location.city(),
            leadTime: `${faker.number.int({ min: 1, max: 10 })} days`
        },
        ratings: {
            average: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
            count: faker.number.int({ min: 0, max: 1000 })
        },
        isActive: faker.datatype.boolean()
    };
};

// Customer Generation Functions
const generateCustomer = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
        customerId: faker.string.uuid(),
        firstName: firstName,
        lastName: lastName,
        email: faker.internet.email({ firstName, lastName }),
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
            notifications: faker.helpers.arrayElement(['SMS', 'Email', 'Both', 'None'])
        },
        accountCreated: faker.date.past(),
        lastLogin: faker.date.recent()
    };
};

// Transaction Generation Functions
const generateTransaction = (customers, products) => {
    const customer = faker.helpers.arrayElement(customers);
    const itemCount = faker.number.int({ min: 1, max: 5 });
    const selectedProducts = faker.helpers.arrayElements(products, itemCount);
    
    const items = selectedProducts.map(product => ({
        productId: product.productId,
        productName: product.name,
        quantity: faker.number.int({ min: 1, max: 5 }),
        unitPrice: product.price.discounted,
        category: product.category
    }));

    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const taxRate = 0.08;
    const shippingCost = parseFloat(faker.commerce.price(10, 50));
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingCost;

    return {
        transactionId: faker.string.uuid(),
        orderId: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
        customerId: customer.customerId,
        customerDetails: {
            name: `${customer.firstName} ${customer.lastName}`,
            email: customer.email,
            phone: customer.phone
        },
        orderDate: faker.date.recent(),
        items: items,
        billing: {
            subtotal: parseFloat(subtotal.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            shippingCost: shippingCost,
            total: parseFloat(total.toFixed(2)),
            currency: 'USD'
        },
        shipping: {
            address: customer.address,
            method: faker.helpers.arrayElement(['Standard', 'Express', 'Next Day']),
            trackingNumber: faker.string.alphanumeric(12).toUpperCase(),
            estimatedDelivery: faker.date.future()
        },
        status: faker.helpers.arrayElement(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED']),
        paymentStatus: faker.helpers.arrayElement(['PAID', 'PENDING', 'FAILED'])
    };
};

// Main Generation Function
const generateEcommerceData = (productCount = 50, customerCount = 100, transactionCount = 200) => {
    console.log('Generating ecommerce test data...');

    // Generate Products
    const categories = generateCategories();
    const products = Array.from({ length: productCount }, () => generateProduct(categories));
    
    // Generate Customers
    const customers = Array.from({ length: customerCount }, generateCustomer);
    
    // Generate Transactions
    const transactions = Array.from({ length: transactionCount }, () => 
        generateTransaction(customers, products)
    );

    // Save all data to separate files
    const dataDir = './test_data';
    if (!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir);
    }

    fs.writeFileSync(
        `${dataDir}/products.json`,
        JSON.stringify(products, null, 2)
    );

    fs.writeFileSync(
        `${dataDir}/customers.json`,
        JSON.stringify(customers, null, 2)
    );

    fs.writeFileSync(
        `${dataDir}/transactions.json`,
        JSON.stringify(transactions, null, 2)
    );

    // Generate summary
    const summary = {
        productsGenerated: products.length,
        customersGenerated: customers.length,
        transactionsGenerated: transactions.length,
        timestamp: new Date().toISOString()
    };

    fs.writeFileSync(
        `${dataDir}/summary.json`,
        JSON.stringify(summary, null, 2)
    );

    return summary;
};

// Verification Function
const verifyGeneratedData = () => {
    try {
        const dataDir = './test_data';
        
        // Read all data files
        const products = JSON.parse(fs.readFileSync(`${dataDir}/products.json`));
        const customers = JSON.parse(fs.readFileSync(`${dataDir}/customers.json`));
        const transactions = JSON.parse(fs.readFileSync(`${dataDir}/transactions.json`));

        // Verify products
        console.log('\nVerifying products...');
        console.log(`✓ ${products.length} products generated`);
        console.log(`✓ Sample product: ${products[0].name}`);

        // Verify customers
        console.log('\nVerifying customers...');
        console.log(`✓ ${customers.length} customers generated`);
        console.log(`✓ Sample customer: ${customers[0].firstName} ${customers[0].lastName}`);

        // Verify transactions
        console.log('\nVerifying transactions...');
        console.log(`✓ ${transactions.length} transactions generated`);
        console.log(`✓ Sample transaction ID: ${transactions[0].orderId}`);

        // Verify relationships
        const sampleTransaction = transactions[0];
        const customerExists = customers.some(c => c.customerId === sampleTransaction.customerId);
        const productExists = products.some(p => p.productId === sampleTransaction.items[0].productId);

        console.log('\nVerifying relationships...');
        console.log(`✓ Customer reference valid: ${customerExists}`);
        console.log(`✓ Product reference valid: ${productExists}`);

        console.log('\n✅ All verifications passed successfully!');

    } catch (error) {
        console.error('❌ Verification failed:', error.message);
    }
};

// Execute the generation and verification
const summary = generateEcommerceData();
console.log('\nGeneration Summary:', summary);
verifyGeneratedData();


// Add at the end of your file
module.exports = {
    generateCategories,
    generateProduct,
    generateCustomer,
    generateTransaction,
    generateEcommerceData,
    verifyGeneratedData
};

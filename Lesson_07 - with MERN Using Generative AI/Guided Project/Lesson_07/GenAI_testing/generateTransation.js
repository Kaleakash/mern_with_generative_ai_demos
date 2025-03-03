const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Function to generate payment methods
const getPaymentMethods = () => ({
    CREDIT_CARD: {
        type: 'CREDIT_CARD',
        cardNumber: faker.finance.creditCardNumber(),
        expiryDate: faker.date.future().toISOString().slice(0, 7),
        cardHolder: faker.person.fullName()
    },
    DEBIT_CARD: {
        type: 'DEBIT_CARD',
        cardNumber: faker.finance.creditCardNumber(),
        bankName: faker.company.name()
    },
    UPI: {
        type: 'UPI',
        upiId: `${faker.internet.username()}@upi`
    },
    WALLET: {
        type: 'WALLET',
        walletProvider: faker.helpers.arrayElement(['PayPal', 'Google Pay', 'Apple Pay'])
    }
});

// Function to generate a single transaction
const generateTransaction = () => {
    const paymentMethods = getPaymentMethods();
    const paymentMethod = faker.helpers.arrayElement(Object.values(paymentMethods));
    const orderStatus = faker.helpers.arrayElement([
        'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'
    ]);
    const itemCount = faker.number.int({ min: 1, max: 5 });
    const items = Array.from({ length: itemCount }, () => ({
        productId: faker.string.uuid(),
        productName: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        unitPrice: parseFloat(faker.commerce.price()),
        category: faker.commerce.department()
    }));

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const taxRate = 0.08;
    const shippingCost = parseFloat(faker.commerce.price(10, 50));
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingCost;

    return {
        transactionId: faker.string.uuid(),
        orderId: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
        customerId: faker.string.uuid(),
        customerDetails: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number()
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
        payment: {
            method: paymentMethod.type,
            details: paymentMethod,
            status: faker.helpers.arrayElement(['SUCCESS', 'PENDING', 'FAILED']),
            paidAt: faker.date.recent()
        },
        shipping: {
            address: {
                street: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                zipCode: faker.location.zipCode(),
                country: faker.location.country()
            },
            method: faker.helpers.arrayElement(['Standard', 'Express', 'Next Day']),
            trackingNumber: faker.string.alphanumeric(12).toUpperCase(),
            estimatedDelivery: faker.date.future()
        },
        status: orderStatus,
        statusHistory: [
            {
                status: 'PENDING',
                timestamp: faker.date.recent(),
                comment: 'Order placed successfully'
            },
            {
                status: orderStatus,
                timestamp: faker.date.recent(),
                comment: `Order ${orderStatus.toLowerCase()}`
            }
        ],
        metadata: {
            deviceInfo: {
                platform: faker.helpers.arrayElement(['iOS', 'Android']),
                deviceModel: faker.helpers.arrayElement(['iPhone 13', 'Samsung S21', 'Google Pixel']),
                ipAddress: faker.internet.ip()
            },
            userAgent: faker.internet.userAgent(),
            sessionId: faker.string.uuid()
        }
    };
};

// Function to generate multiple transactions
const generateTransactions = (count) => {
    const transactions = [];
    for (let i = 0; i < count; i++) {
        transactions.push(generateTransaction());
    }
    return transactions;
};

// Generate 50 transactions
const transactionData = generateTransactions(50);

// Save to JSON file
fs.writeFileSync(
    'transaction_test_data.json',
    JSON.stringify(transactionData, null, 2),
    'utf-8'
);

console.log('Transaction test data generated successfully!');

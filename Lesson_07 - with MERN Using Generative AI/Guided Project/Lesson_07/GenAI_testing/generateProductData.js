const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Function to generate product categories
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

// Function to generate a single product
const generateProduct = (categories) => {
    const category = faker.helpers.arrayElement(categories);
    const brand = faker.company.name();
    
    return {
        productId: faker.string.uuid(),
        sku: faker.string.alphanumeric(8).toUpperCase(),
        name: `${brand} ${faker.commerce.productName()}`,
        brand: brand,
        category: category,
        description: faker.commerce.productDescription(),
        price: {
            regular: parseFloat(faker.commerce.price({ min: 50, max: 2000 })),
            discount: faker.number.int({ min: 0, max: 30 }),
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
        images: Array.from({ length: 4 }, () => ({
            url: faker.image.url(),
            alt: faker.commerce.productName(),
            isPrimary: false
        })),
        features: Array.from(
            { length: faker.number.int({ min: 3, max: 6 }) },
            () => faker.commerce.productAdjective()
        ),
        tags: Array.from(
            { length: faker.number.int({ min: 2, max: 5 }) },
            () => faker.commerce.productMaterial()
        ),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        isActive: faker.datatype.boolean()
    };
};

// Function to generate multiple products
const generateProducts = (count) => {
    const categories = generateCategories();
    const products = [];
    
    for (let i = 0; i < count; i++) {
        products.push(generateProduct(categories));
    }
    
    return products;
};

// Generate 50 products
const productData = generateProducts(50);

// Save to JSON file
fs.writeFileSync(
    'product_test_data.json',
    JSON.stringify(productData, null, 2),
    'utf-8'
);

console.log('Product test data generated successfully!');

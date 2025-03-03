const assert = require('assert');
const fs = require('fs');

const verifyProductData = () => {
    try {
        // Read generated data
        const data = JSON.parse(fs.readFileSync('product_test_data.json', 'utf-8'));
        
        // Basic verification
        assert(Array.isArray(data), 'Data should be an array');
        assert(data.length === 50, 'Should have 50 records');
        
        // Verify first record structure
        const firstProduct = data[0];
        assert(firstProduct.productId, 'Product should have ID');
        assert(firstProduct.name, 'Product should have name');
        assert(firstProduct.price, 'Product should have price');
        assert(firstProduct.category, 'Product should have category');
        assert(firstProduct.inventory, 'Product should have inventory');
        
        // Verify price structure
        assert(typeof firstProduct.price.regular === 'number', 'Price should be a number');
        assert(firstProduct.price.currency === 'USD', 'Currency should be USD');
        
        console.log('✅ Product test data verification passed!');
        console.log(`Total products generated: ${data.length}`);
        
        // Display sample product
        console.log('\nSample Product:');
        console.log(JSON.stringify(firstProduct, null, 2));
        
    } catch (error) {
        console.error('❌ Product test data verification failed:', error.message);
    }
};

verifyProductData();

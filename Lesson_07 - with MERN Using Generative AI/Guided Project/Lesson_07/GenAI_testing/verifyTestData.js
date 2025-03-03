const assert = require('assert');
const fs = require('fs');

// Test verification script
const verifyTestData = () => {
    try {
        // Read generated data
        const data = JSON.parse(fs.readFileSync('customer_test_data.json', 'utf-8'));
        
        // Basic verification
        assert(Array.isArray(data), 'Data should be an array');
        assert(data.length === 100, 'Should have 100 records');
        
        // Verify first record structure
        const firstRecord = data[0];
        assert(firstRecord.id, 'Record should have ID');
        assert(firstRecord.firstName, 'Record should have firstName');
        assert(firstRecord.email, 'Record should have email');
        assert(firstRecord.address, 'Record should have address');
        
        console.log('✅ Test data verification passed!');
        console.log(`Total records generated: ${data.length}`);
        
    } catch (error) {
        console.error('❌ Test data verification failed:', error.message);
    }
};

verifyTestData();

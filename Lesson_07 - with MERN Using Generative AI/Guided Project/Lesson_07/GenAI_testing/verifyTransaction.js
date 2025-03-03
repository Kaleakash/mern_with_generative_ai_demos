    const assert = require('assert');
    const fs = require('fs');

    const verifyTransactionData = () => {
        try {
            // Read generated data
            const data = JSON.parse(fs.readFileSync('transaction_test_data.json', 'utf-8'));
            
            // Basic verification
            assert(Array.isArray(data), 'Data should be an array');
            assert(data.length === 50, 'Should have 50 records');
            
            // Verify first record structure
            const firstTransaction = data[0];
            assert(firstTransaction.transactionId, 'Transaction should have ID');
            assert(firstTransaction.orderId, 'Transaction should have order ID');
            assert(firstTransaction.customerDetails, 'Transaction should have customer details');
            assert(firstTransaction.items, 'Transaction should have items');
            assert(firstTransaction.billing, 'Transaction should have billing info');
            assert(firstTransaction.payment, 'Transaction should have payment info');
            
            // Verify billing calculations
            const billing = firstTransaction.billing;
            assert(typeof billing.total === 'number', 'Total should be a number');
            assert(billing.total === billing.subtotal + billing.tax + billing.shippingCost,
                'Total should equal subtotal + tax + shipping');
            
            console.log('✅ Transaction test data verification passed!');
            console.log(`Total transactions generated: ${data.length}`);
            
            // Display sample transaction
            console.log('\nSample Transaction:');
            console.log(JSON.stringify(firstTransaction, null, 2));
            
        } catch (error) {
            console.error('❌ Transaction test data verification failed:', error.message);
        }
    };

    verifyTransactionData();

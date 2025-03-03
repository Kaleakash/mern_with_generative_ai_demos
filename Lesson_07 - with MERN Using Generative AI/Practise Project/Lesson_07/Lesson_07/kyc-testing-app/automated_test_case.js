const faker = require('faker');

// Sample Suspicious Transaction Logic
const testScenarios = [
    {
        name: "Large Single Transaction",
        description: "Test for large single transactions",
        scenario: (transaction) => transaction.amount > 50000,
        reason: "Large transaction amount"
    },
    {
        name: "Cross-Border Transfer",
        description: "Test for transfers between different countries",
        scenario: (transaction) => transaction.senderCountry !== transaction.receiverCountry,
        reason: "Large cross-border transfer"
    },
    {
        name: "Rapid Transactions",
        description: "Test for rapid transactions from the same account",
        scenario: (transaction, allTransactions) => {
            const recentTransactions = allTransactions.filter(t => t.customerId === transaction.customerId && (Math.abs(new Date(t.date) - new Date(transaction.date)) <= 24 * 60 * 60 * 1000));
            return recentTransactions.length > 3 && recentTransactions.reduce((acc, t) => acc + parseFloat(t.amount), 0) > 100000;
        },
        reason: "Multiple large transactions in short time"
    },
    {
        name: "Frequent Small Transactions",
        description: "Test for frequent small transactions from one customer",
        scenario: (transaction, allTransactions) => {
            const recentTransactions = allTransactions.filter(t => t.customerId === transaction.customerId && (Math.abs(new Date(t.date) - new Date(transaction.date)) <= 24 * 60 * 60 * 1000));
            return recentTransactions.length > 10 && recentTransactions.every(t => parseFloat(t.amount) < 200);
        },
        reason: "Frequent small transactions"
    },
    {
        name: "Transfer to High-Risk Country",
        description: "Test for transfer to high-risk countries",
        scenario: (transaction) => ['North Korea', 'Iran'].includes(transaction.receiverCountry),
        reason: "Transfer to/from high-risk country"
    }
];

// Simulate synthetic transactions (sample data)
const transactions = [
    { amount: "60000", customerId: "1234", date: "2025-03-01T10:00:00", senderCountry: "USA", receiverCountry: "UK", senderBank: "BankA", receiverBank: "BankB" },
    { amount: "30000", customerId: "1234", date: "2025-03-01T11:00:00", senderCountry: "USA", receiverCountry: "Canada", senderBank: "BankA", receiverBank: "BankC" },
    { amount: "1000", customerId: "5678", date: "2025-03-02T12:00:00", senderCountry: "Canada", receiverCountry: "USA", senderBank: "BankD", receiverBank: "BankE" }
];

// Function to apply test scenarios to each transaction
function applyTestScenarios(transactions) {
    transactions.forEach(transaction => {
        testScenarios.forEach(scenario => {
            const isSuspicious = scenario.scenario(transaction, transactions);
            if (isSuspicious) {
                console.log(`Transaction ID: ${transaction.customerId} is suspicious for ${scenario.name}`);
                console.log(`Reason: ${scenario.reason}`);
            }
        });
    });
}

// Apply the test scenarios
applyTestScenarios(transactions);

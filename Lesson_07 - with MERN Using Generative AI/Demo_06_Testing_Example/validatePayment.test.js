const { JSDOM } = require('jsdom');

describe('Payment Gateway Validation', () => {
    let document;

    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Gateway</title>
                <style>
                    .error-message {
                        display: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <form id="paymentForm">
                        <input type="text" id="cardNumber" placeholder="Enter your card number">
                        <div class="error-message" id="cardNumberError"></div>
                        <input type="text" id="cardHolderName" placeholder="Enter cardholder name">
                        <div class="error-message" id="cardHolderNameError"></div>
                        <input type="text" id="expiryDate" placeholder="MM/YYYY">
                        <div class="error-message" id="expiryDateError"></div>
                        <input type="text" id="cvv" placeholder="Enter CVV">
                        <div class="error-message" id="cvvError"></div>
                        <input type="number" id="amount" placeholder="Enter amount">
                        <div class="error-message" id="amountError"></div>
                        <button type="submit">Pay Now</button>
                    </form>
                </div>
            </body>
            </html>
        `);
        document = dom.window.document;

        // Mock functions to simulate DOM behavior
        document.getElementById('cardNumber').value = '';
        document.getElementById('cardHolderName').value = '';
        document.getElementById('expiryDate').value = '';
        document.getElementById('cvv').value = '';
        document.getElementById('amount').value = '';

        // Provide valid default values for each input
        // document.getElementById('cardNumber').value = '1234567812345678';
        // document.getElementById('cardHolderName').value = 'John';
        // document.getElementById('expiryDate').value = '12/2025';
        // document.getElementById('cvv').value = '123';
        // document.getElementById('amount').value = '100';
    });

    const validatePayment = () => {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardHolderName = document.getElementById('cardHolderName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const amount = document.getElementById('amount').value;

        const cardNumberError = document.getElementById('cardNumberError');
        const cardHolderNameError = document.getElementById('cardHolderNameError');
        const expiryDateError = document.getElementById('expiryDateError');
        const cvvError = document.getElementById('cvvError');
        const amountError = document.getElementById('amountError');

        let isValid = true;

        if (!/^(\d{16})$/.test(cardNumber)) {
            cardNumberError.textContent = "Please enter a valid card number.";
            cardNumberError.style.display = 'block';
            isValid = false;
        } else {
            cardNumberError.textContent = "";
            cardNumberError.style.display = 'none';
        }

        if (cardHolderName.trim() === "") {
            cardHolderNameError.textContent = "Please enter the cardholder name.";
            cardHolderNameError.style.display = 'block';
            isValid = false;
        } else {
            cardHolderNameError.textContent = "";
            cardHolderNameError.style.display = 'none';
        }

        if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiryDate)) {
            expiryDateError.textContent = "Please enter a valid expiry date in MM/YYYY format.";
            expiryDateError.style.display = 'block';
            isValid = false;
        } else {
            expiryDateError.textContent = "";
            expiryDateError.style.display = 'none';
        }

        if (!/^\d{3}$/.test(cvv)) {
            cvvError.textContent = "Please enter a valid CVV.";
            cvvError.style.display = 'block';
            isValid = false;
        } else {
            cvvError.textContent = "";
            cvvError.style.display = 'none';
        }

        if (isNaN(amount) || amount <= 0) {
            amountError.textContent = "Please enter a valid amount.";
            amountError.style.display = 'block';
            isValid = false;
        } else {
            amountError.textContent = "";
            amountError.style.display = 'none';
        }

        return isValid;
    };

    test('should validate card number', () => {
        document.getElementById('cardNumber').value = '1234567812345678';
        expect(validatePayment()).toBe(true);

        document.getElementById('cardNumber').value = 'invalid';
        expect(validatePayment()).toBe(false);
        expect(document.getElementById('cardNumberError').textContent).toBe('Please enter a valid card number.');
    });

    test('should validate cardholder name', () => {
        document.getElementById('cardHolderName').value = 'John Doe';
        expect(validatePayment()).toBe(true);

        document.getElementById('cardHolderName').value = '';
        expect(validatePayment()).toBe(false);
        expect(document.getElementById('cardHolderNameError').textContent).toBe('Please enter the cardholder name.');
    });

    test('should validate expiry date', () => {
        document.getElementById('expiryDate').value = '12/2025';
        expect(validatePayment()).toBe(true);

        document.getElementById('expiryDate').value = 'invalid';
        expect(validatePayment()).toBe(false);
        expect(document.getElementById('expiryDateError').textContent).toBe('Please enter a valid expiry date in MM/YYYY format.');
    });

    test('should validate cvv', () => {
        document.getElementById('cvv').value = '123';
        expect(validatePayment()).toBe(true);

        document.getElementById('cvv').value = 'invalid';
        expect(validatePayment()).toBe(false);
        expect(document.getElementById('cvvError').textContent).toBe('Please enter a valid CVV.');
    });

    test('should validate amount', () => {
        document.getElementById('amount').value = '100';
        expect(validatePayment()).toBe(true);

        document.getElementById('amount').value = '-10';
        expect(validatePayment()).toBe(false);
        expect(document.getElementById('amountError').textContent).toBe('Please enter a valid amount.');
    });
});

function validatePayment() {
    var cardNumber = document.getElementById('cardNumber').value;
    var cardHolderName = document.getElementById('cardHolderName').value;
    var expiryDate = document.getElementById('expiryDate').value;
    var cvv = document.getElementById('cvv').value;
    var amount = document.getElementById('amount').value;

    var cardNumberError = document.getElementById('cardNumberError');
    var cardHolderNameError = document.getElementById('cardHolderNameError');
    var expiryDateError = document.getElementById('expiryDateError');
    var cvvError = document.getElementById('cvvError');
    var amountError = document.getElementById('amountError');

    // Simple validation for demonstration purposes
    var isValid = true;

    if (!/^(\d{16})$/.test(cardNumber)) {
        cardNumberError.textContent = "Please enter a valid card number.";
        isValid = false;
    } else {
        cardNumberError.textContent = "";
    }

    if (cardHolderName.trim() === "") {
        cardHolderNameError.textContent = "Please enter the cardholder name.";
        isValid = false;
    } else {
        cardHolderNameError.textContent = "";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiryDate)) {
        expiryDateError.textContent = "Please enter a valid expiry date in MM/YYYY format.";
        isValid = false;
    } else {
        expiryDateError.textContent = "";
    }

    if (!/^\d{3}$/.test(cvv)) {
        cvvError.textContent = "Please enter a valid CVV.";
        isValid = false;
    } else {
        cvvError.textContent = "";
    }

    if (isNaN(amount) || amount <= 0) {
        amountError.textContent = "Please enter a valid amount.";
        isValid = false;
    } else {
        amountError.textContent = "";
    }

    return isValid;
}

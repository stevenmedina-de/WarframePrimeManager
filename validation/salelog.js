const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTransactionInput(input) {
    let errors = {};

    input.items = !isEmpty(input.items) ? input.items : "";
    input.price = !isEmpty(input.price) ? input.price : "";
    input.sale = !isEmpty(input.sale) ? input.sale : "";

    if (Validator.isEmpty(input.items)) {
        errors.items = "Select the item(s) to add to the transaction log";
    }
    if (Validator.isEmpty(input.price)) {
        errors.price = "Add a price to the selected item(s)";
    }
    if (Validator.isEmpty(input.sale)) {
        errors.sale = "Specify whether you want to buy or sale the selected item(s)";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
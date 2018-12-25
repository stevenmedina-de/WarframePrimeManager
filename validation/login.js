const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(input) {
    let errors = {};

    input.name = !isEmpty(input.name) ? input.name : "";
    input.password = !isEmpty(input.password) ? input.password : "";

    if (Validator.isEmpty(input.name)) {
        errors.name = "Please input a username";
    }

    if (Validator.isEmpty(input.password)) {
        errors.password = "Please input a password";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
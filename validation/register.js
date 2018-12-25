const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(input) {
    let errors = {};

    input.name = !isEmpty(input.name) ? input.name : "";
    input.password = !isEmpty(input.password) ? input.password : "";

    if (Validator.isEmpty(input.name)) {
        errors.name = "Input a username";
    }
    if (Validator.isEmpty(input.password)) {
        errors.password = "Input a password";
    }
    if (Validator.isEmpty(input.email)) {
        errors.email = "Input an email address";
    }
    if (!Validator.isEmail(input.email)) {
        errors.email = "Email is invalid"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
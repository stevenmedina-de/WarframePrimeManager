const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFrameInput(input) {
    let errors = {};

    input.warframe = !isEmpty(input.warframe) ? input.warframe : "";
    input.helmet = !isEmpty(input.helmet) ? input.helmet : "";
    input.chassis = !isEmpty(input.chassis) ? input.chassis : "";
    input.systems = !isEmpty(input.systems) ? input.systems : "";
    input.blueprint = !isEmpty(input.blueprint) ? input.blueprint : "";

    if (Validator.isEmpty(input.warframe)) {
        errors.msg = 'Fill in all form entries';
    }
    if (Validator.isEmpty(input.helmet)) {
        errors.msg = 'Fill in all form entries';
    }
    if (Validator.isEmpty(input.chassis)) {
        errors.msg = 'Fill in all form entries';
    }
    if (Validator.isEmpty(input.systems)) {
        errors.msg = 'Fill in all form entries';
    }
    if (Validator.isEmpty(input.blueprint)) {
        errors.msg = 'Fill in all form entries';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
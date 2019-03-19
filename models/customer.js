const Joi = require('joi');
const mongoose = require('mongoose');

// create schema for class customer
let customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3
    },
    phone: {
        type: String,
        required: true,
        maxlength: 25,
        minlength: 9
    },
    isGold: {
        type: Boolean,
        default: false,
    },
});

// create class customer
const Customer = mongoose.model('Customers', customerSchema);

function validateCustomer(customer) {
    let shcmea = {
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(9).max(25).required(),
        isGold: Joi.boolean().default(),
    }
    return Joi.validate(customer, shcmea);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.customerSchema = customerSchema;
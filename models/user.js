const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        maxlength: 255,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        maxlength: 255
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.generateToken = function () {
    return token = jwt.sign({ _id: this._id,isAdmin:this.isAdmin}, config.get('jwtPrivateKey'));
}

const User =  mongoose.model('users', userSchema);

function validateUser(user) {
    const scheam = {
        firstName: Joi.string().min(3).max(255).trim().required(),
        lastName: Joi.string().min(3).max(255).trim().required(),
        email: Joi.string().min(7).max(255).trim().required(),
        password: Joi.string().min(7).max(255).trim().required(),
        phone: Joi.string().min(7).max(255).trim().required(),
        isAdmin: Joi.boolean().default(),
    }
    return Joi.validate(user, scheam);
}

const complexityOptions = {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
}

// function validatePassword(password){
//    return Joi.validate(password,new PasswordComplexity(complexityOptions));
// }

// console.log(validatePassword(123456))
exports.User = User;
exports.validate = validateUser;





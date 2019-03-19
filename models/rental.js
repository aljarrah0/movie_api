const Joi = require('joi');
const mongoose = require('mongoose');
const { movieSchema } = require('./movie')
const { customerSchema } = require('./customer')

let rentalSchema = mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true,
    },
    movie: {
        type: movieSchema,
        required: true,
    },
    dateOut: {
        type: Date,
        default: Date.now(),
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
    }
});

let Rental = new mongoose.model('Rentals', rentalSchema);

function validateRental(rental) {
    let schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        rentalFee:Joi.number(),
        dateReturned:Joi.date(),
    }
    return Joi.validate(rental, schema);
}

exports.validate = validateRental;
exports.Rental = Rental;
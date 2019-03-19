const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

let movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        minlength:5,
        maxlength:255,
    },
    // embedded references
    genre: {
        type: genreSchema,
        required: true,
       
    },
    numberInStock: {
        type: Number,
        required: true,
        min:0,
        max:255,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min:0,
        max:255,
    }
});

const Movie = new mongoose.model('Movies', movieSchema);

function validateMovie(movie) {
    let schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate:Joi. number().min(0).max(255).required(),
    }

    return Joi.validate(movie, schema);
}

exports.movieSchema = movieSchema;
exports.validate = validateMovie;
exports.Movie = Movie;
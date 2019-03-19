const Joi = require('joi');
const mongoose = require('mongoose');

let genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

let Genre = new mongoose.model('Genres', genreSchema);

function validationGenre(genre) {
    let schema = {
        name: Joi.string().required(),
    }
    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validationGenre;

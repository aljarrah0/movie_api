const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const cors = require('cors');
const _ = require('lodash');

router.get('/', auth, cors(), async (req, res) => {
    let movies = await Movie.find().select('-_id -__v').sort('name');
    if (movies.length === 0) return res.status(404).send('not found the movies');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    let movie = await Movie.findById(req.params.id).select('-_id -__v');
    if (!movie) return res.status(404).send('not found the movie');
    res.send(movie);
});

router.post('/', async (req, res) => {

    let { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    // لم أستطيع فهمها
    let genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');

    const { title, numberInStock, dailyRentalRate } = req.body,
        { _id, name } = genre;
        
    let movie = new Movie({ title, genre: { _id, name }, numberInStock, dailyRentalRate, });
    await movie.save();
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre');

    const { title, numberInStock, dailyRentalRate } = req.body,
    { _id, name } = genre

    let updateMovie = await Movie.findByIdAndUpdate(req.params.id,
        { title, genre: { _id, name }, numberInStock, dailyRentalRate, },
        { new: true });
    res.send(updateMovie);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    let movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('The Movie with the given ID was not found');
    res.send(movie);
});

//var mapped = _.map(results, _.partialRight(_.pick, ['title', 'genre', 'numberinStock','dailyRentalRate']));

module.exports = router;
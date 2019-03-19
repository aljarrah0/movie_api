const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.get('/',cors(), async (req, res) => {
    let genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    let genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(400).send('The genre id is not found.');
    res.send(genre);
});

router.post('/', async (req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre =  new Genre({
        name: req.body.name,
    });
    genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let updateGenre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });
    res.send(updateGenre);
});

router.delete('/:id', async (req, res) => {
    let genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('The ID is not found');
    res.send(genre);
});

module.exports = router;
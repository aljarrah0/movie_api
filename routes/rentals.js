const express = require('express');
const router = express.Router();
const { Rental, validate } = require('../models/rental');
const fawn = require('fawn');
const mongoose = require('mongoose');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');

fawn.init(mongoose);

router.get('/', async (req, res) => {
    let rental = await Rental.find().select('-dateOut');
    res.send(rental);
});

router.get('/:id', async (req, res) => {
    let rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('Invalid ID for rental');
    res.send(rental);
});


router.post('/', async (req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('The Customer Is Not Found.');

    let movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send('The Movie Is Not Found.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie Not In Stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate:movie.dailyRentalRate,
            numberInStock:movie.numberInStock,
        },
        rentalFee:req.body.rentalFee,
        dateReturned:req.body.dateReturned,
    });
    
    try {
        new fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();
        res.send(rental);
    } catch (ex) {
        res.status(500).send('Somthing faild');
    }
});

module.exports = router;
const express = require('express');
const customers = require('../routes/customers');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');



module.exports = (app)=>{

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

//#region  handle the request invalid
app.get('*', (req, res) => {
    res.status(400).send('Invalid Url');
});

app.post('*', (req, res) => {
    res.status(400).send('Invalid Url');
});

app.put('*', (req, res) => {
    res.status(400).send('Invalid Url');
});

//#endregion

}
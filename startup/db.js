const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb://localhost/movie', { useNewUrlParser: true })
        .then(() => winston.info('DB customers is connected'))
        .catch(err => winston.error(err.message,err));
}
const winston = require('winston');
module.exports = (err, req, res, next) => {
    // save the error in files of DB
    winston.error(err.message,err);
    res.status(500).send(`error message,${err.name}`);
}
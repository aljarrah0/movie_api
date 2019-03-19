
const winston = require('winston');
require('winston-mongodb');

module.exports = () => {
    // winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtException.log' }));

    process.on('uncaughtException', (ex) => {
        console.log(ex.message);
        winston.error(ex.message, ex);
    });

    // process.on('unhandledRejection', (ex) => {
    //     console.log(ex.message);
    //     winston.error(ex.message, ex);
    //     //throw ex;
    // });
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/movie',
        level: 'info',
    });
}
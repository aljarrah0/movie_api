const winston = require('winston')
const express = require('express');
const app = express();

require('./startup/config')();
require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/validation');

//throw new Error ('aljarrahlajrahha;lkjdasldkfjsaldkfjas;lkdjf;asldkjf');

//Promise.reject(new error('........................Aljarrah..............'));



const port = process.env.PORT || 5050;
app.listen(port, () => winston.info(`the sever connect on port : ${port}`));


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzhlM2Y0MzU1MDg5NTExNTBlYmNlY2UiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTUyODI2MTc5fQ.8YHZmB6TtlPG9uwSAqFs8t6anzeycToHuuAgaOEq7KY
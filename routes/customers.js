const  express = require('express');
const  router = express.Router();
const  { Customer, validate } = require('../models/customer');
const  cors = require('cors');
const   _ = require('lodash');
//const asyncMiddleware = require('../middleware/async');
require('express-async-errors');


let corsOptions = {
    origin: 'https://null.jsbin.com',
    optionsSuccessStatus: 200
}



router.get('/', cors(corsOptions), async (req, res, next) => {
    let customers = await Customer.find().select('-_id -__v').sort('name');
    res.send(customers);
});

router.get('/:id', cors(corsOptions), async (req, res) => {
    console.log('------------>ONE')
    let customer = await Customer.findById(req.params.id).select('-_id -__v');
    console.log('------------>TWO')
    //handel customer
    if (!customer) return res.status(404).send('The Customer with the given ID was not found.');
    res.send(customer);
});

router.post('/', async (req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = await new Customer(_.pick(req.body,['name','phone','isGold'])).save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id);
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let updateCustomer = await Customer.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'phone', 'isGold']), { new: true })
    .select('-_id -__v');
    if (!updateCustomer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(updateCustomer);
});

router.delete('/:id', async (req, res) => {
    let customer = await Customer.findByIdAndDelete(req.params.id).select('-_id -__v');
    if (!customer) return res.status(404).send('The customer with the given ID was not found.')
    res.send(customer);
});

module.exports = router;
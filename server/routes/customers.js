import { Router } from 'express';
import customers from '../data/customers';
import { check, validationResult } from 'express-validator/check'

// Utils
import chalk from 'chalk';
const log = console.log;

// Models
import Customer from '../models/Customer';

const routes = Router();


routes.get('/', (req, res, next) => {
    res.status(200).json({
        error: 'Wrong api called'
    })
});

routes.post('/new', [
    check('firstname').isString().isLength({ min: 1 }),
    check('birthday').isLength({ min: 1 })
], (req, res, next) => {
    log(chalk.blue(JSON.stringify(req.body, null, 2)));
    const errors = validationResult(req);
    const { firstname, lastname, birthday, gender } = req.body;
    
    if(!errors.isEmpty()){
        log(chalk.red('Validation Errors: ', JSON.stringify(errors.array(), null, 2)));
        res.status(422).json({
            errors: errors.array()
        })
    }

    let customer = new Customer({
        name: {
            first: firstname,
            last: lastname
        },
        birthday,
        gender
    });

    customer.save((err, customer) => {
        if(err){
            log(chalk.red('Mongo Errors: ', JSON.stringify(err, null, 2)));
            res.status(422).json({
                errors: err
            })
        }
        
        log(chalk.green('No Error: ', JSON.stringify(customer, null, 2)));
        res.status(200).json({
            ok: true,
            customer
        })
    })
});

routes.get('/all', (req, res, next) => {
    res.status(200).json({
        ok: true,
        customers
    })
})

export default routes;
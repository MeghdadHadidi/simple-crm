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
        return res.status(422).json({
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
            return res.status(422).json({
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
    Customer.find({}, (err, customers) => {
        if(err){
            log(chalk.orange('Problem when listing customers', JSON.stringify(err, null, 2)));
            return res.status(422).json({
                ok: false,
                error: err
            });
        }

        let customerList = customers.map((item, index) => {
            return {
                customerID: item._id,
                name: item.name,
                birthday: item.birthday,
                gender: item.gender
            }
        });

        log(chalk.green('No Errors: ', JSON.stringify(customerList, null, 2)));

        res.status(200).json({
            ok: true,
            customerList
        })
    })
});

routes.get('/:id', (req, res, next) => {
    if(req.params.id){
        Customer.find({ _id: req.params.id }, (err, customer) => {
            if(err){
                log(chalk.error('Mongo Errors: ', JSON.stringify(err, null, 2)));

                return res.status(422).json({
                    ok: false,
                    error: err
                });
            }

            if(!customer){
                log(chalk.error('No customer found'));

                return res.status(404).json({
                    ok: false,
                    customer
                });
            }

            log(chalk.green('No Errors: ', JSON.stringify(customer, null, 2)));
            
            let { name, birthday, gender, lastContact, customerLifetimeValue } = customer[0];

            delete customer[0]._id;
            res.status(200).json({
                ok: true,
                customer: {
                    name, birthday, gender, lastContact, customerLifetimeValue, customerID: customer[0]._id
                }
            });
        })
    }
    else{
        return res.status(422).json({
            ok: false,
            error: 'No identifier provided!'
        })
    }
});

routes.put('/:id', [
    check('customerID').isString()
], (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        log(chalk.red('Validation Errors: ', JSON.stringify(errors.array(), null, 2)));

        return res.status(422).json({
            ok: false,
            errors: errors.array()
        });
    }

    if(req.params.id){
        let newCustomer = req.body;
        newCustomer.name = {
            first: req.body.firstname,
            last: req.body.lastname
        }
        delete newCustomer.firstname;
        delete newCustomer.lastname;
        Customer.findByIdAndUpdate(req.params.id, newCustomer, (err, customer) => {
            if(err){
                log(chalk.red('Mongo Error: ', JSON.stringify(err, null, 2)));

                return res.status(422).json({
                    ok: false,
                    error: err
                });
            }

            if(!customer){
                log(chalk.red('No customer found', JSON.stringify(customer, null, 2)));

                return res.status(404).json({
                    ok: false,
                    error: 'No customer found with provided ID'
                });
            }

            log(chalk.red('Trying to edit: ', JSON.stringify(customer, null, 2)));
            res.status(200).json({
                ok: true,
                customer
            })
        });
    }
});


routes.delete('/:id', (req, res) => {
    if(req.params.id){
        Customer.findByIdAndRemove(req.params.id, (err, customer) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    error: err
                });
            }

            res.status(200).json({
                ok: true,
                customer
            })
        })
    }
});

export default routes;
import { Router } from 'express';

const routes = Router();


routes.get('/', (req, res, next) => {
    res.status(200).json({
        error: 'Wrong api called'
    })
});

routes.get('/all', (req, res, next) => {

    res.status(200).json({
        customers: [
            {
                id: 1,
                name: 'meghdad',
                lastName: 'hadidi'
            }
        ]
    })
});

routes.post('/new', (req, res, next) => {
    res.status(200).json({
        customerDate: req.body
    })
})

export default routes;
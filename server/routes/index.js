import { Router } from 'express';

const routes = Router();

// Routes
import customers from './customers';

routes.use('/customers', customers);

export default routes;
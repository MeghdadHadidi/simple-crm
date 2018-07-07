import express from 'express';
import mongoose from 'mongoose';

// Database connection
mongoose.connect('mongodb://localhost/crm');
const db = mongoose.connection;
db.on('error', () => console.error('Mongo connection error!'));
db.once('open', () => {
    console.log('Connected to MongoDb');
});

// Routes
import routes from './routes';

const app = express()

const port = process.env.PORT || 5000;

app.use('/api', routes);

app.listen(port, () => console.log('Server is listening on ', port))
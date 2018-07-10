import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Utils
import chalk from 'chalk';

// Routes
import routes from './routes';

// Database connection
mongoose.connect('mongodb://localhost/crm');
const db = mongoose.connection;
db.on('error', (err) => console.log(chalk.red('Mongo connection error: '+ err.message)));
db.once('open', () => {
    console.log('Connected to MongoDb');
});

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => console.log('Server is listening on ', port))
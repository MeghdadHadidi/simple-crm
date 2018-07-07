import express from 'express'

const app = express()

const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello Meghdad' });
});

app.listen(port, () => console.log('Server is listening on ', port))
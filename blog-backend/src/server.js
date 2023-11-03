import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello there you little piglet');

});

app.listen(8000, () => {
    console.log('Server is listening on prot 8000')
});
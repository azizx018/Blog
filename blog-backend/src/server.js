import express from 'express';
import { db, connectToDb } from '../db.js';
import  fs from 'fs';
import admin from 'firebase-admin';

const credentials = JSON.parse(fs.readFileSync('../credentials.json'));

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});


const app = express();
app.use(express.json());

app.get('/api/articles/:name', async(req, res) => {
    const { name } = req.params;

    const article = await db?.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }  
});

app.put('/api/articles/:name/upvote', async(req, res) => {
    const { name } = req.params;
    await db.collection('articles').updateOne({ name }, {
        //the inc increases a value in mongo
        $inc: { upvotes: 1 },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);

    } else {
        res.send('That article is not found')
    }
});


app.post('/api/articles/:name/comments', async(req, res) => {
    const { name } = req.params;
    const { postedBy, text } =req.body;
    await db.collection('articles').updateOne({ name }, {
        //adds new item to array in mongo
        $push: { comments: { postedBy, text} },
    });
    const article = await db.collection('articles').findOne({ name });


    if (article) {
        res.json(article);

    } else {
        res.send('That article is not found')
    }
    

});

connectToDb(() => {
    console.log('connected to db!')
    app.listen(8000, () => {
        console.log('Server is listening on port 8000')
    });
})


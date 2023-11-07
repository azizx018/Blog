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

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            res.sendStatus(400);
        }
    }
    next();
    
});

app.get('/api/articles/:name', async(req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db?.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.include(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }  
});

app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }

});

app.put('/api/articles/:name/upvote', async(req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.include(uid);
        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                //the inc increases a value in mongo
                $inc: { upvotes: 1 },
                $push: {upvoteIds: uid}
            });

        }
        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
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


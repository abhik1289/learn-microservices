const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const { randomBytes } = require("crypto");
app.use(bodyParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }))
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})
app.post('/posts', (req, res) => {
    console.log(req.body)
    const title = req.body.title;
    const id = randomBytes(4).toString('hex');
    posts[id] = {
        id,
        title
    }
    res.status(201).json({ posts });
})
app.listen(4000, () => {
    console.log("Post server listening on port: " + 4000);
})
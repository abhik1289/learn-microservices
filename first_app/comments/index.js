const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { randomBytes } = require("crypto");
const cors = require('cors');
app.use(bodyParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }))
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})
app.post('/posts/:id/comments', (req, res) => {
    console.log(req.body)
    const content = req.body.content;
    const id = randomBytes(4).toString('hex');
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: id, content: content });
    commentsByPostId[req.params.id] = comments;

    res.status(201).json({ comments });
})
app.listen(4001, () => {
    console.log("Post server listening on port: " + 4001);
})
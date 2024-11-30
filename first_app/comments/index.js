const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { randomBytes } = require("crypto");
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }))
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})
app.post('/posts/:id/comments', async (req, res) => {
    console.log(req.body)
    const content = req.body.content;
    const id = randomBytes(4).toString('hex');
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: id, content: content });
    commentsByPostId[req.params.id] = comments;
    await axios.post("http://localhost:4005/events", {
        type: "commentCreated",
        data: {
            commentId: id,
            content,
            postId: req.params.id
        }
    })
    res.status(201).json({ comments });
});

app.post("/events", (req, res) => {
    console.log(req.body.type);
    res.status(200).json({});
});

app.listen(4001, () => {
    console.log("Post server listening on port: " + 4001);
})
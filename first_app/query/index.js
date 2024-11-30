const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const { randomBytes } = require("crypto");
const axios = require('axios');
app.use(bodyParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const posts = {};

app.post("/events", (req, res) => {
    const type = req.body.type;
    if (type === "postCreated") {

        const { id,
            title } = req.body.data;

        const data = {
            id, title, comments: []
        }
        posts[id] = data;
        console.log(posts);
    } else {
        const { commentId,
            content,
            postId } = req.body.data;
            console.log(commentId,
                content,
                postId )
        const info = posts[postId];
        console.log(info)
        info.comments.push({
            commentId,
            content,
            postId
        })
    }
    res.status(200).json({});
})

app.get("/events", ((req, res) => {
    res.status(201).send(posts);
}))




app.listen(4002, () => {
    console.log("Post server listening on port: " + 4002);
})
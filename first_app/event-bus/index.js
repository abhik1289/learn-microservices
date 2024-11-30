const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const { randomBytes } = require("crypto");
const cors = require('cors');
const axios = require('axios');
app.use(bodyParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.post("/events", async (req, res) => {
    const event = req.body;
    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    res.send({ status: 'OK' });

})



app.listen(4005, () => {
    console.log("Server running on port 4005")
})




require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { PORT } = require("./constants/constants");
const { MONGO_URI } = require("./constants/constants");
const bodyParser = require('body-parser');
const app = express();
// const MessageModel = require("../models/Messages");

// connect to mongodb
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'DataIntegration',
})
    .then(res => {
        console.log("connected to mongodb");
    })
    .catch(err => {
        console.log(err);
    })

// use middleware to parse body req to json


// use middleware to enable cors
app.use(cors());
app.use(express.json());
// route middleware
app.use("/", mainRouter);

app.get('/settings', function (req, res) {
    res.send('Settings Page');
});


app.listen(PORT, () => {
    console.log("server start on port - " + PORT);
})

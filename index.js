var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var dotenv = require("dotenv");
var apiRouter = require("./routers/api");

dotenv.config();

//db
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useFindAndModify: false})
.then(() => { console.log("DB connected")})
.catch(() => console.log("Any error can not connect DB"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: , ${err.message}`);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));

// app.use("/")
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

//Route prefixes
app.use("/api/", apiRouter);

// module.exports = app;


var express = require("express");
var userRouter = require("./user");

var app = express();

app.use("/users/", userRouter);

module.exports = app;
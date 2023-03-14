var express = require('express');
var app = express();


var mysql = require("mysql");
var config = require("../dbConfig");


var session = require('express-session');
app.use(session({
    'secret': "dilankaratas"
}));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

module.exports.index = function (req, res) {
    console.log('deneme');
};
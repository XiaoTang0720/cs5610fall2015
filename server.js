var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610');
var db = mongoose.connection;

console.log(mongoose);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(multer());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require("./public/assignment/server/services/form.service.js")(app);
//require("./public/assignment/server/services/user.service.js")(app);
//require("./public/assignment/server/services/field.service.js")(app);
require("./public/assignment/server/app.js")(app, mongoose, db);
require("./public/project/server/app.js")(app, mongoose, db);

app.listen(port , ipaddress);

console.log('Server now is listen to 127.0.0.1:3000');
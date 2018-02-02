const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import my usage
var index = require('./routes/index');
var users = require('./routes/users');
var groups = require('./routes/groups');
var logs = require('./routes/logs');

const app = express();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/chaton')
  .then(() =>  console.log('mongodb connection succesful'))
  .catch((err) => console.error(err));


app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({ extended: false }));
app.set('x-powered-by', false);


app.use('/', index);
app.use('/users', users);
app.use('/logs', logs);
app.use('/groups', groups);

app.listen(3000, function(){
  console.log('listening on *: 3000');
});
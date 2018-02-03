const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
//import my usage
var index = require('./routes/index');
var users = require('./routes/users');
var groups = require('./routes/groups');
var logs = require('./routes/logs');

const validator = require('express-validator')

const app = express();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/chaton')
  .then(() =>  console.log('mongodb connection succesful'))
  .catch((err) => console.error(err));

app.use(cors());
app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.set('x-powered-by', false);

app.use((req, res, next) =>{
  res.like = (data, err) => {
    if (err){
      res.json({ status: 'failed', data: null, error: err });
    }else{
      res.json({ status: 'success', data: data, error: null });
    }
  }
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/logs', logs);
app.use('/groups', groups);

app.listen(3000, function(){
  console.log('listening on *: 3000');
});

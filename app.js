const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs')
const logger = require('morgan');
const validator = require('express-validator')
const path = require('path')

//import my usage
const config = require('./config/main')

var index = require('./routes/index');
var users = require('./routes/users/users');
var usersGroup = require('./routes/users/groups');
var groups = require('./routes/groups');
var logs = require('./routes/logs');


const app = express();
mongoose.Promise = global.Promise;

const accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/access.log'), {flags: 'a'})

mongoose.connect(config.database)
  .then(() =>  console.log('mongodb connection succesful'))
  .catch((err) => console.error(err));

app.use(cors());
app.use(logger('combined', { stream: accessLogStream }))
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
  };
});

app.use('/', index);
app.use('/users', usersGroup, users);
app.use('/logs', logs);
app.use('/groups', groups);

app.listen(3000, function(){
  console.log('listening on *: 3000');
});

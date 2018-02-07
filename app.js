const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000

const validator = require('express-validator')
const path = require('path')
const socket = require('./socket/index')

//import my usage
const config = require('./config/main')

const handle = require('./middleware/handle')

const index = require('./routes/index');
const users = require('./routes/users');
const groups = require('./routes/groups');


const app = express();
mongoose.Promise = global.Promise;

mongoose.connect(config.database)
  .then(() =>  console.log('mongodb connection succesful'))
  .catch((err) => console.error(err));

app.use(cors());
app.set('trust proxy', true);
app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.set('x-powered-by', false);
app.use(handle.format);

app.use('/', index);
app.use('/users', users);
app.use('/groups', groups);

const server = app.listen(PORT, function(){
  console.log('listening on *: 5000');
});
const io = require('socket.io').listen(server);
socket(io);
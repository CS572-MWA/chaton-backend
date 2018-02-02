const mongoose = require('mongoose');
const Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;
const User = require('../models/User.js');

const logSchema = Schema({ 
  groupId: ObjectId,
  userId: String,
  content: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
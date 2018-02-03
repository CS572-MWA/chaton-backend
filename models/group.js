const mongoose = require('mongoose');
const Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const logSchema = Schema({ 
  name: String,
  users: [{ type : ObjectId, ref: 'User' }]
},{
  timestamps: true
});

module.exports = mongoose.model('Group', logSchema);
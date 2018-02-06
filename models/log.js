const mongoose = require('mongoose');
const Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const logSchema = Schema({ 
  groupId: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  content: String
},{
  timestamps: true
});

module.exports = Log = mongoose.model('Log', logSchema);


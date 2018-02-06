const mongoose = require('mongoose');
const Group = require('./group')
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

module.exports.getLogs = (user, cb)=>{
  var result = {}
  Group.find({ users: user.id })
    .populate({
      path: 'users',
      select: 'username email age gender'
    })
    .exec((err, groups) => {
      if (err) return cb(err, null);
      for (let group of groups){
        result[group._id] = group.toObject();
        result[group._id].messages = []
      }
      Log.find({ groupId:  { $in: groups }})
        .populate({
          path: 'user',
          select: 'username email age gender'
        })
        .exec((err, logs) => {
          if (err) return cb(err, null);
          for (let log of logs){
            let glog = log.toObject()
            glog.type = log.user.id === user.id ? "self" : "other"
            result[log.groupId].messages.push(glog);
          }
          return cb(null, Object.values(result));
        })
    });
};
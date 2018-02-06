const mongoose = require('mongoose');
const Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const logSchema = Schema({ 
  name: String,
  users: [{ type : ObjectId, ref: 'User' }],
  status: { type: Number, default: 2 },
},{
  timestamps: true
});

module.exports = Group = mongoose.model('Group', logSchema);

module.exports.addUserForGeoGroup = (user, geo) => {
  const options = {
    path: 'users',
    select: 'username email age gender'
  };
  const name = geo.get('city') + ", " + geo.get('regionCode') +  ", " +geo.get('countryCode');
  return Group.findOneAndUpdate({ name: name, status: 1 }, { $addToSet: { users: user._id } }, { upsert: true, new: true, runValidators: true, populate: options  });
};
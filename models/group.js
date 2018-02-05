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

module.exports.addUserForGeoGroup = (user, geo, cb) => {
  const name = geo.get('city') + ", " + geo.get('regionCode') +  ", " +geo.get('countryCode');
  Group.update({ name: name, status: 1 }, { $addToSet: { users: user._id } }, { upsert: true, new: true }, cb);
};
var Group = require('./../../models/group');

exports.getGroups = (req, res) => {
  Group.find({ users: req.user.id })
    .populate({
      path: 'users',
      select: 'username email age gender'
    })
    .exec((err, groups) => {
      res.like(groups, err);
    });
};

exports.addUserForGroup = (req, res) => {
  const options = {
    path: 'users',
    select: 'username email age gender'
  };
  Group.findByIdAndUpdate(req.params.id, { $addToSet: { users: { $each: req.body.users } } }, { upsert: true, new: true, runValidators: true, populate: options }, (err, groups) => {
    res.like(groups, err);
  })
};

exports.removeUserForGroup = (req, res) => {
  Group.findByIdAndUpdate(req.params.id, { $pull: { users: req.params.user_id } }, {upsert: true, new: true}).exec((err, groups) => {
    res.like(groups, err);
  })
};
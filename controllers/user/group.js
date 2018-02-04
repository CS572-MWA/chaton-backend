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
  Group.findByIdAndUpdate(req.params.id, { $addToSet: { users: { $each: req.body.users } } }, (err, groups) => {
    res.like(groups, err);
  })
};
  
const User = require('./../models/User.js'),
    Log = require('./../models/Log.js'),
    Group = require('./../models/Group.js');

exports.getLogs = (req, res, next) => {  
    Group.find({ users: req.user._id })
        .select('_id')
        .exec((err, groups) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            let fullLogs = [];
            groups.forEach((group) => {
                Log.find({ 'groupId': group._id })
                    .sort('-createdAt')
                    .limit(1)
                    .populate({
                        path: "user",
                        select: "profile.username profile.gender"
                    })
                    .exec((err, log) => {
                        if (err) {
                            res.send({ error: err });
                            return next(err);
                        }
                        fullLogs.push(log);
                        if(fullLogs.length === logs.length) {
                            return res.status(200).json({ logs: fullLogs });
                        }
                    });
            });
        });
}

exports.newGroup = function(req, res, next) {  
    if(!req.params.partiners 
        || !req.params.name
        || !req.params.preMessage) {
      res.status(422).send({ error: 'Please choose a valid' });
      return next();
    }
  
    const group = new Group({
        name: name,
        users: [req.user._id, ...req.params.recipient]
    });
  
    group.save(function(err, newGroup) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
  
      const log = new Log({
        groupId: newGroup._id,
        content: req.body.preMessage,
        author: req.user._id
      });
  
      log.save((err, newLog) => {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
        res.status(200).json({ log: 'Thank you for join', groupId: group._id });
        return next();
      });
    });
}
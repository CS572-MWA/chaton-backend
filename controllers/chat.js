const User = require('../models/User.js'),
    Log = require('../models/Log.js'),
    Group = require('../models/Group.js');

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
    if(!req.params.partiners) {
      res.status(422).send({ error: 'Please choose a valid' });
      return next();
    }
  
    const group = new Group({
        users: [req.user._id, ...req.params.recipient]
    });
  
    conversation.save(function(err, newConversation) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
  
      const message = new Message({
        conversationId: newConversation._id,
        body: req.body.composedMessage,
        author: req.user._id
      });
  
      message.save(function(err, newMessage) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
  
        res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
        return next();
      });
    });
}
var User = require('./../../models/user');
var Group = require('./../../models/group');
const jwt = require('jsonwebtoken')
const config = require('./../../config/main')
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  // User.findOne({ email: req.body.email }, function (err, user) {
  //   const result = { auth: false, token: null };
  //   if (err) return res.like(user, err);
  //   if (!user) return res.like(null, { message: 'User not found' });
  //   var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  //   result.password = passwordIsValid;
  //   if (!passwordIsValid) return res.like(null, result);
  //   var token = jwt.sign({ id: user._id, email: user.email, username: user.username, gender: user.gender, age: user.age }, config.secret, {
  //     expiresIn: 86400
  //   });
  //   console.log(token);
  //   Group.addUserForGeoGroup(user, req.geo, (err, result) => { // uun deer public and geo group yavuulna
  //     console.log("addUserForGeoGroup: ",err, result);
  //     if (err){
  //       res.like({ auth: false, token: token, groups: result }, err);  
  //     }else{
  //       console.log({ auth: true, token: token, groups: result });
  //       res.like({ auth: true, token: token, groups: result }, err);
  //     }
  //   });
    
  // });

  let result = { auth: false, token: null };
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) throw({ message: 'User not found' });
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      result.password = passwordIsValid;
      if (!passwordIsValid) throw(result);
      var token = jwt.sign({ id: user._id, email: user.email, username: user.username, gender: user.gender, age: user.age }, config.secret, {
        expiresIn: 86400
      });
      result.token = token;
      return user;
    })
    .then(user => {
      return Group.addUserForGeoGroup(user, req.geo);
    })
    .then(group => Group.find({ status: { $lt: 2 } }).populate({
      path: 'users',
      select: 'username email age gender'
    }))
    .then(groups => {
      result.auth = true;
      result.groups = groups;
      res.like(result, null);
      console.log("user: ", result);
    })
    .catch(err => {
      console.log(err);
      res.like(null, err);
    })
};

exports.getUsers = (req, res) => {
  User.find((err, users) => {
    res.like(users,err);
  },{ password: 0 });
};

exports.addUser = (req, res) => {
  User.create(req.body)
    .then(user => {
      var token = jwt.sign({ id: user._id, email: user.email, username: user.username, gender: user.gender, age: user.age }, config.secret, {
        expiresIn: 86400
      });
      return { token : { auth: true, token: token }, user: user };
    }).then(data => {
      Group.update({ status: 0 }, { $addToSet: { users: data.user._id } }, { new: true }, (err, data) => {
        // console.log("add user in public: ", data);
      });
      res.like(data, null);
    })
    .catch(err => {
      res.like(null, err);
    });
};

exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, post) => {
    res.like(post,err);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, { upsert: true, new: true }, (err, user) => {
    if (err){
      res.like({ auth: true, token: token, user: user }, err);
    }else{
      var token = jwt.sign({ id: user._id, email: user.email, username: user.username, gender: user.gender, age: user.age }, config.secret, {
        expiresIn: 86400
      });
      res.like({ auth: true, token: token, user: user }, err);
    }
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.user.id, req.body, (err, post) =>{
    res.like(post,err);
  });
};
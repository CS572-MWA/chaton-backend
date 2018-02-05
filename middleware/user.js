const bcrypt = require('bcryptjs')
const publicIp = require('public-ip');
const where = require('node-where');

exports.login = (req, res, next) => {
  req.assert('email', 'Email is required').notEmpty();
  req.assert('password', 'Password is required').notEmpty();
  const errors = req.validationErrors();
  console.log(req.body);
  if (errors){
    res.like(null, { code: -1, msg: errors.map(er => er.msg)});
  }else{
    next();
    // publicIp.v4().then(ip => {
    //   where.is(ip, function(err, result) {
    //     req.geo = result;
    //     next();
    //   });
    // });
  }
};

exports.addUser = (req, res, next) => {
  req.assert('username', 'Username is required').notEmpty();
  req.assert('email', 'Email is required').notEmpty();
  req.assert('password', 'Password is required').notEmpty();
  req.assert('age', 'Age is required').notEmpty();
  req.assert('gender', 'Gender is required').notEmpty();
  req.assert('location', 'Location is required').notEmpty();
  const errors = req.validationErrors();
  if (errors){
    res.like(null, { code: -1, msg: errors.map(er => er.msg)});
  }else{
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    next();
  }
};

exports.updateUser = (req, res, next) => {
  req.assert('username', 'Username is required').notEmpty();
  req.assert('age', 'Age is required').notEmpty();
  req.assert('gender', 'Gender is required').notEmpty();

  if (req.user.email === req.body.email) delete req.body.email;
  if (!req.body.password || 0 === req.body.password.length){
    delete req.body.password;
  }else{
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }
  console.log("update body: ", req.body);

  const errors = req.validationErrors();
  if (errors){
    res.like(null, { code: -1, msg: errors.map(er => er.msg)});
  }else{
    next();
  }
};
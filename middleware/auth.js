const config = require('./../config/main');
const jwt = require('jsonwebtoken');

exports.checkedAuth = (req, res, next) => {
  var token = req.headers['authorization'];
  if (token && token.length > 8) {
    token = token.substr(7);
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.like(null,{ code: 401, message: 'Failed to authenticate token.' });
      } else {
        req.user = decoded;    
        next();
      }
    });
  } else {
    return res.like(null,{ code: 401, message: 'No token provided.' });
  }
};
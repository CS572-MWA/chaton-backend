const config = require('./../config/main')

exports.checkedAuth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log("xp");
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.like(null,{ code: 0, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    return res.like(null,{ code: 0, message: 'No token provided.' });
  }
};
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
		next();
	}
};

exports.updateUser = (req, res, next) => {
    req.assert('username', 'Username is required').notEmpty();
	req.assert('email', 'Email is required').notEmpty();
	req.assert('age', 'Age is required').notEmpty();
	req.assert('gender', 'Gender is required').notEmpty();
	req.assert('location', 'Location is required').notEmpty();
	const errors = req.validationErrors();
	if (errors){
		res.like(null, { code: -1, msg: errors.map(er => er.msg)});
	}else{
		next();
	}
};
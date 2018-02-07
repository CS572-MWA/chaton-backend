exports.format = (req, res, next) => {
  res.like = (data, err) => {
    if (err){
      res.json({ status: 'failed', data: null, error: err });
    }else{
      res.json({ status: 'success', data: data, error: null });
    }
  };
  next();
};
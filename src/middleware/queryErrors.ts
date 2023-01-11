import express from 'express';

const queryError = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  if (req.query.width === '0' || req.query.height === '0') {
    return res.send('height or width can not be 0');
  }
  if (!req.query.width || !req.query.height) {
    return res.send('Please provide width and height in url parameters');
  }
  next()
};

export default queryError;

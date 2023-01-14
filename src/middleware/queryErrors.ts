import express from 'express';
import imageDetails from '../../images/imageDetails';

const queryError = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const image = await imageDetails(req.params.image);
    if (image) {
      if (!image.imageFilesNames.includes(req.params.image)) {
        throw new Error('Please provide a valid image name');
      }
      if (req.query.width === '0' || req.query.height === '0') {
        throw new Error('height or width can not be 0');
      }
      if (!req.query.width || !req.query.height) {
        throw new Error('Please provide width and height in url parameters');
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default queryError;

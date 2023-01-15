import express from 'express';
import imageDetails from '../util/imageDetails';

const queryError = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void | Response> => {
  try {
    const image = await imageDetails(req.params.image);
    if (image) {
      if (!image.imageExists) {
        throw new Error('Please provide a valid image name');
      }
      if (isNaN(Number(req.query.width)) || isNaN(Number(req.query.height))) {
        throw new Error(
          'Height and width must be in integer format and cannot be in text.'
        );
      }
      if (Number(req.query.width) < 1 || Number(req.query.height) < 1) {
        throw new Error('Height and width must be greater than 0');
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

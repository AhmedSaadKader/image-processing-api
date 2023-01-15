import { Router, NextFunction } from 'express';
import { resizeImage } from '../controllers/convertController';
import outputCheck from '../middleware/outputMiddleware';
import queryError from '../middleware/queryErrors';

const router = Router();

router.get('/', (req, res, next: NextFunction): void => {
  try {
    throw new Error('Please provide an image name');
  } catch (error) {
    next(error);
  }
});

router.get('/:image', queryError, outputCheck, resizeImage);

export default router;

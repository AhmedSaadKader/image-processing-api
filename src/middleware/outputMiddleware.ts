import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import imageDetails from '../util/imageDetails';

const outputCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const providedImageName = req.params.image;
  const { width, height } = req.query;
  const image = await imageDetails(providedImageName);
  const imageName = image?.imageName;
  const outputFile = `./images/resized/${imageName}${width}x${height}.jpg`;
  if (fs.existsSync(outputFile)) {
    const imageStream = fs.createReadStream(outputFile);
    imageStream.on('error', () => {
      return res.sendStatus(404).send('image not found');
    });
    res.type('image/jpg');
    return imageStream.pipe(res);
  }
  next();
};

export default outputCheck;

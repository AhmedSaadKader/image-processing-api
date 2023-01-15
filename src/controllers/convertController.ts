import { Request, Response } from 'express';
import imageDetails from '../util/imageDetails';
import convertImage from '../util/convertingImage';

export const resizeImage = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  if (req.query.width && req.query.height) {
    const providedImageName = req.params.image;
    const { width, height } = req.query;
    const image = await imageDetails(providedImageName);
    const imageName = image?.imageName;
    const imagePath = image?.imagePath;
    const imageStream = await convertImage(imageName, imagePath, width, height);
    imageStream.on('error', () => {
      return res.sendStatus(404).send('image not found');
    });
    res.type('image/jpg');
    return imageStream.pipe(res);
  }
};

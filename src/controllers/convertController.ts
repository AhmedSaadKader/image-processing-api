import express from 'express';
import sharp from 'sharp';
import * as fs from 'fs';
import imageDetails from '../../images/imageDetails';

export const resizeImage = async (
  req: express.Request,
  res: express.Response
) => {
  if (req.query.width && req.query.height) {
    const imageNameWithExt = req.params.image;
    const { width, height } = req.query;
    const image = await imageDetails(imageNameWithExt);
    const imageName = image?.imageName;
    const imagePath = image?.imagePath;
    const outputFile = `./images/resized/${imageName}${width}x${height}.jpg`;
    try {
      await sharp(imagePath).resize(+width, +height).toFile(outputFile);
      const imageStream = fs.createReadStream(outputFile);
      imageStream.on('error', () => {
        return res.sendStatus(404).send('image not found');
      });
      res.type('image/jpg');
      return imageStream.pipe(res);
    } catch (error) {
      return res.sendStatus(404).send('image not found');
    }
  }
};

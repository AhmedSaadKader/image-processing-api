import express from 'express';
import * as fs from 'fs';
import imageDetails from '../../images/imageDetails';

const outputCheck = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const imageNameWithExt = req.params.image;
  const { width, height } = req.query;
  const image = await imageDetails(imageNameWithExt);
  const imageName = image?.imageName;
  const outputFile = `./images/resized/${imageName}${width}x${height}.jpg`;
  try {
    if (fs.existsSync(outputFile)) {
      const imageStream = fs.createReadStream(outputFile);
      imageStream.on('error', () => {
        return res.sendStatus(404).send('image not found');
      });
      res.type('image/jpg');
      return imageStream.pipe(res);
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

export default outputCheck;

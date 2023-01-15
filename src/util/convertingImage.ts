import sharp from 'sharp';
import * as fs from 'fs';

const convertImage = async <T>(
  imageName: string | undefined,
  imagePath: string | undefined,
  width: T,
  height: T
): Promise<fs.ReadStream> => {
  const outputFile = `./images/resized/${imageName}${width}x${height}.jpg`;
  await sharp(imagePath).resize(+width, +height).toFile(outputFile);
  const imageStream = fs.createReadStream(outputFile);
  return imageStream;
};

export default convertImage;

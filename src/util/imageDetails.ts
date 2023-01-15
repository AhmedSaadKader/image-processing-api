import * as fs from 'fs';
import * as path from 'path';

interface ImageDetailsReturn {
  imageName: string | undefined;
  imageExists: boolean;
  imagePath: string | undefined;
  imageFilesNames: string[] | undefined;
}

const imageDetails = async (
  providedImageName: string
): Promise<ImageDetailsReturn> => {
  const imageFilesNames = await fs.promises.readdir('./images/full');
  let imageExists = false;
  let imageNameWithExt: string | undefined = undefined;
  if (imageFilesNames.includes(providedImageName)) {
    imageNameWithExt = providedImageName;
    imageExists = true;
  } else {
    imageFilesNames.forEach((name): void | boolean => {
      const nameWithoutExt = name.split('.').slice(0, -1).join('.');
      if (nameWithoutExt === providedImageName) {
        imageNameWithExt = name;
        imageExists = true;
        return;
      }
    });
  }
  let imagePath, imageFull, imageName;
  if (imageFilesNames.includes(imageNameWithExt as unknown as string)) {
    imagePath = path.join(
      './images/full',
      imageNameWithExt as unknown as string
    );
    imageFull = path.parse(imagePath);
    imageName = imageFull.name;
  }
  return { imageName, imageExists, imagePath, imageFilesNames };
};

export default imageDetails;

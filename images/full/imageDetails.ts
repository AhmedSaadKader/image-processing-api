import * as fs from "fs"
import * as path from "path"


const imageDetails = async(imageNameWithExt:string) => {
    const imageFilesNames = await fs.promises.readdir("./images/full")
    let imagePath, imageFull, imageName
    if (imageFilesNames.includes(imageNameWithExt)){
        imagePath= path.join(__dirname, imageNameWithExt)
        imageFull = path.parse(imagePath)
        imageName = imageFull.name
    } 
    return {imageName, imagePath}
}

export default imageDetails
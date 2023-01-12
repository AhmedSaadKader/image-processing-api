import * as fs from "fs"
import * as path from "path"


const imageDetails = async(imageNameWithExt:string) => {
    try {
        const imageFilesNames = await fs.promises.readdir("./images/full")
        let imagePath, imageFull, imageName
        if (imageFilesNames.includes(imageNameWithExt)){
            imagePath= path.join('./images/full', imageNameWithExt)
            imageFull = path.parse(imagePath)
            imageName = imageFull.name
        } 
        return {imageName, imagePath, imageFilesNames}
    } catch (error) {
        console.log(error)
    }
}

export default imageDetails
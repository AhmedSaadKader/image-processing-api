import * as fs from "fs"
import * as path from "path"


const imageDetails = async(imageName="fjord.jpg") => {
    const imageFilesNames = await fs.promises.readdir("./images/full")
    let imagePath, imageFull
    if (imageFilesNames.includes(imageName)){
        imagePath= path.join(__dirname, imageName)
        imageFull = path.parse(imagePath)
    } 
    console.log(imageFull)
    console.log(imagePath)
    return {imageFull, imagePath}
}

export default imageDetails
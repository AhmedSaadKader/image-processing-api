import * as fs from "fs"
import * as path from "path"

const imageFiles = fs.promises.readdir("./images/full")

const logFiles = () => {
    const imagePath = path.join(__dirname, 'fjord.jpg')
    console.log(imagePath)
    console.log(imageFiles)
    return imagePath
}

export default logFiles
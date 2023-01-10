import express from "express"
import sharp from "sharp"
import * as fs from "fs"
import imageDetails from "../../images/full/imageDetails";

export const resizeImage = async (req:express.Request, res:express.Response) => {
  if (req.query.width === '0' || req.query.height === '0'){
    return res.send("height or width can not be 0")
  }
  if (!req.query.width || !req.query.height){
    return res.send("Please provide width and height in url parameters")
  }
  if (req.query.width && req.query.height) {
    const {width, height} = req.query
    const {imagePath} = await imageDetails(req.params.image)
    try {
      await sharp(imagePath).resize(+width,+height).toFile('./images/resized/output.jpg')
      const imageStream = fs.createReadStream('./images/resized/output.jpg')
      imageStream.on('error', () => {
        res.sendStatus(404).send("image not found")
      })
      res.type('image/jpg')
      return imageStream.pipe(res)
    } catch (error) {
      console.log(error)
      return res.sendStatus(404).send("image not found")
    }
  }
};

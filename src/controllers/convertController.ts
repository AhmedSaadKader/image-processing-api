import express from "express"
import sharp from "sharp"
import * as fs from "fs"

export const resizeImage = async (req:express.Request, res:express.Response) => {
  const {width, height} = req.query
  // const readStream = fs.createReadStream('./images/full/encenadaport.jpg')
  // const resizedImage = 
  await sharp('./images/full/encenadaport.jpg').resize(500,500).toFile('./images/resized/output.jpg')
  const imageStream = fs.createReadStream('./images/resized/output.jpg')
  res.type('image/jpg')
  // return readStream.pipe(resizedImage)
  imageStream.pipe(res)
};

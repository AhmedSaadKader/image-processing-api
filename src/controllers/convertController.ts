import express from "express"
import sharp from "sharp"
import * as fs from "fs"

export const resizeImage = async (req:express.Request, res:express.Response) => {
  const {width, height} = req.query
  // const readStream = fs.createReadStream('./images/full/encenadaport.jpg')
  // const resizedImage = 
  try {
    await sharp('./images/full/encenadaports.jpg').resize(500,500).toFile('./images/resized/output.jpg')
    const imageStream = fs.createReadStream('./images/resized/outputs.jpg')
    imageStream.on('error', () => {
      res.sendStatus(404).send("image not found")
    })
    res.type('image/jpg')
    // return readStream.pipe(resizedImage)
    imageStream.pipe(res)
  } catch (error) {
    console.log(error)
    res.sendStatus(404).send("image not found")
  }
};

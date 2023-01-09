import express from "express"
import sharp from "sharp"
import * as fs from "fs"

export const resizeImage = async (req:express.Request, res:express.Response) => {
  const readStream = fs.createReadStream('./images/full/encenadaport.jpg')
  // res.type('image/jpg')
  readStream.pipe(res)
};

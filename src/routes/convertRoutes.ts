import { Router } from "express";
import {resizeImage} from "../controllers/convertController"
import outputCheck from "../middleware/outputMiddleware";
import queryError from "../middleware/queryErrors";

const router = Router()

router.use(queryError)

router.get('/:image',outputCheck, resizeImage)

export default router

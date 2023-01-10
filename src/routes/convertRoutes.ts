import { Router } from "express";
import {resizeImage} from "../controllers/convertController"

const router = Router()

router.get('/:image', resizeImage)

export default router

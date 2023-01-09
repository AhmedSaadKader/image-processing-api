import { Router } from "express";
import {resizeImage} from "../controllers/convertController"

const router = Router()

router.get('/', resizeImage)

export default router

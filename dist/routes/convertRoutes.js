"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const convertController_1 = require("../controllers/convertController");
const router = (0, express_1.Router)();
router.get('/', convertController_1.resizeImage);
exports.default = router;

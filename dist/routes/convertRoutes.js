"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const convertController_1 = require("../controllers/convertController");
const outputMiddleware_1 = __importDefault(require("../middleware/outputMiddleware"));
const queryErrors_1 = __importDefault(require("../middleware/queryErrors"));
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    try {
        throw new Error('Please provide an image name');
    }
    catch (error) {
        next(error);
    }
});
router.get('/:image', queryErrors_1.default, outputMiddleware_1.default, convertController_1.resizeImage);
exports.default = router;

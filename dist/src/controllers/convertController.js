"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs = __importStar(require("fs"));
const imageDetails_1 = __importDefault(require("../../images/imageDetails"));
const resizeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.width && req.query.height) {
        const imageNameWithExt = req.params.image;
        const { width, height } = req.query;
        const image = yield (0, imageDetails_1.default)(imageNameWithExt);
        const imageName = image === null || image === void 0 ? void 0 : image.imageName;
        const imagePath = image === null || image === void 0 ? void 0 : image.imagePath;
        const outputFile = `./images/resized/${imageName}${width}x${height}.jpg`;
        try {
            yield (0, sharp_1.default)(imagePath).resize(+width, +height).toFile(outputFile);
            const imageStream = fs.createReadStream(outputFile);
            imageStream.on('error', () => {
                return res.sendStatus(404).send("image not found");
            });
            res.type('image/jpg');
            return imageStream.pipe(res);
        }
        catch (error) {
            return res.sendStatus(404).send("image not found");
        }
    }
});
exports.resizeImage = resizeImage;

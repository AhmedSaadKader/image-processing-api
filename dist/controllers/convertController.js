"use strict";
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
const imageDetails_1 = __importDefault(require("../util/imageDetails"));
const convertingImage_1 = __importDefault(require("../util/convertingImage"));
const resizeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.width && req.query.height) {
        const providedImageName = req.params.image;
        const { width, height } = req.query;
        const image = yield (0, imageDetails_1.default)(providedImageName);
        const imageName = image === null || image === void 0 ? void 0 : image.imageName;
        const imagePath = image === null || image === void 0 ? void 0 : image.imagePath;
        const imageStream = yield (0, convertingImage_1.default)(imageName, imagePath, width, height);
        imageStream.on('error', () => {
            return res.sendStatus(404).send('image not found');
        });
        res.type('image/jpg');
        return imageStream.pipe(res);
    }
});
exports.resizeImage = resizeImage;

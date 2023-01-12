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
const imageDetails_1 = __importDefault(require("../../images/imageDetails"));
const queryError = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield (0, imageDetails_1.default)(req.params.image);
        if (image) {
            if (!image.imageFilesNames.includes(req.params.image)) {
                throw new Error("Please provide a valid image name");
            }
            if (req.query.width === '0' || req.query.height === '0') {
                throw new Error('height or width can not be 0');
            }
            if (!req.query.width || !req.query.height) {
                throw new Error('Please provide width and height in url parameters');
            }
            next();
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = queryError;

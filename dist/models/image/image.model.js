"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
const image_1 = require("../../entity/image");
class ImageModel extends image_1.Image {
    constructor(image) {
        super();
        this.id = image.id;
        this.image_code = image.image_code;
        this.image_default = image.image_default;
        this.image_name = image.image_name;
        this.image_type = image.image_type;
    }
}
exports.ImageModel = ImageModel;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageType = exports.SalerOrderStatus = void 0;
var SalerOrderStatus;
(function (SalerOrderStatus) {
    SalerOrderStatus[SalerOrderStatus["NHAP"] = 1] = "NHAP";
    SalerOrderStatus[SalerOrderStatus["CHOVANCHUYEN"] = 100000000] = "CHOVANCHUYEN";
    SalerOrderStatus[SalerOrderStatus["DAGIAOHANG"] = 100000001] = "DAGIAOHANG";
})(SalerOrderStatus || (exports.SalerOrderStatus = SalerOrderStatus = {}));
var ImageType;
(function (ImageType) {
    ImageType[ImageType["SLIDERTYPE"] = 100000000] = "SLIDERTYPE";
    ImageType[ImageType["PRODUCTTYPE"] = 100000001] = "PRODUCTTYPE";
})(ImageType || (exports.ImageType = ImageType = {}));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = void 0;
const winston_1 = __importDefault(require("winston"));
exports.logging = winston_1.default.createLogger({
    //format của log được thông qua format combine
    format: winston_1.default.format.combine(winston_1.default.format.splat(), 
    // định dạng time cho log
    winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), 
    //thêm màu sắc
    winston_1.default.format.colorize(), winston_1.default.format.printf(log => {
        if (log.stack)
            return `[${log.timestamp}] [${log.level}] [${log.stack}]`;
        return `[${log.timestamp}] [${log.level}] [${log.message}]`;
    })),
    transports: [
        // hiển thị log qua console
        new winston_1.default.transports.Console()
    ]
});

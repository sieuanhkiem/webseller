"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = __importDefault(require("../config/config"));
class Common {
    static CheckVariableNotNull(variable) {
        return variable != undefined && variable != null;
    }
    static encrypt(data) {
        let message = '';
        if (!(data instanceof String))
            message = JSON.stringify(data);
        else
            message = data;
        const secrectkey = config_1.default.secrectkey;
        const vi = secrectkey.split('').slice(0, 8).join('');
        const cripher = crypto_js_1.default.TripleDES.encrypt(message, crypto_js_1.default.enc.Utf8.parse(secrectkey), {
            iv: crypto_js_1.default.enc.Utf8.parse(vi),
            mode: crypto_js_1.default.mode.CBC
        });
        return cripher.toString();
    }
    static decrypt(cripherText) {
        const secrectkey = config_1.default.secrectkey;
        const vi = secrectkey.split('').slice(0, 8).join('');
        const wordArray = crypto_js_1.default.TripleDES.decrypt(cripherText, crypto_js_1.default.enc.Utf8.parse(secrectkey), {
            iv: crypto_js_1.default.enc.Utf8.parse(vi),
            mode: crypto_js_1.default.mode.CBC
        });
        return JSON.parse(wordArray.toString(crypto_js_1.default.enc.Utf8));
    }
    static booleanify(value) {
        const truety = [
            'true',
            'TRUE',
            '1'
        ];
        return truety.includes(value);
    }
    static paddWithLeadingZeros(num, totalLengt) {
        return String(num).padStart(totalLengt, '0');
    }
}
exports.Common = Common;
;

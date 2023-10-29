"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("../../config/logging");
class MainController {
    static index(req, res) {
        try {
            return res.render('./admin/main.ejs');
        }
        catch (error) {
            logging_1.logging.error(`[${MainController.name}].[${MainController.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }
}
exports.default = MainController;

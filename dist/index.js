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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const { logging } = require('./config/logging');
const config_1 = __importDefault(require("./config/config"));
require("./common/string_extendsion");
const data_source_1 = require("./data-source");
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_route_1 = require("./routes/index.route");
// import { Common } from './common/common_extendsion';
const mainApp = (0, express_1.default)();
mainApp.use('*/css', express_1.default.static('./public/css'));
mainApp.use('*/js', express_1.default.static('./public/javascript'));
mainApp.use('*/images', express_1.default.static('./public/images'));
mainApp.set('views', './views');
mainApp.set('view engine', 'ejs');
mainApp.use((0, express_session_1.default)({
    secret: config_1.default.secrectkey,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1,
        sameSite: 'lax'
    },
    resave: false
}));
mainApp.use((0, body_parser_1.default)({
    limit: '50mb',
    extended: true
}));
mainApp.use(express_1.default.json());
mainApp.use(express_1.default.urlencoded({ extended: true }));
mainApp.use((0, cookie_parser_1.default)());
(0, index_route_1.AddRouteClient)(mainApp);
(0, index_route_1.AddRouteSession)(mainApp);
(0, index_route_1.AddRouteJson)(mainApp);
(0, index_route_1.AdRoutedAdmin)(mainApp);
mainApp.use(function (req, res) {
    res.status(404);
    if (req.accepts('html')) {
        return res.redirect('/page_error');
    }
});
mainApp.listen(config_1.default.server.port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, data_source_1.initialize)();
    console.log(`⚡️[server]: Server is running at http://${config_1.default.server.hostname}:${config_1.default.server.port}}`);
}));

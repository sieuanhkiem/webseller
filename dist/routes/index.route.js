"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdRoutedAdmin = exports.AddRouteJson = exports.AddRouteSession = exports.AddRouteClient = void 0;
const main_route_1 = __importDefault(require("./client/main.route"));
const category_route_1 = __importDefault(require("./client/category.route"));
const product_route_1 = __importDefault(require("./client/product.route"));
const page_error_route_1 = __importDefault(require("./client/page_error.route"));
const session_route_1 = __importDefault(require("./session/session.route"));
const cart_route_1 = __importDefault(require("./client/cart.route"));
const delivery_route_1 = __importDefault(require("./client/delivery.route"));
const final_route_1 = __importDefault(require("./client/final.route"));
const json_route_1 = __importDefault(require("./json/json.route"));
const admin_route_1 = __importDefault(require("./admin/admin.route"));
function AddRouteClient(mainApp) {
    mainApp.use('', main_route_1.default);
    mainApp.use('/category', category_route_1.default);
    mainApp.use('/product', product_route_1.default);
    mainApp.use('/cart', cart_route_1.default);
    mainApp.use('/delivery', delivery_route_1.default);
    mainApp.use('/final', final_route_1.default);
    mainApp.use('/page_error', page_error_route_1.default);
}
exports.AddRouteClient = AddRouteClient;
function AddRouteSession(mainApp) {
    mainApp.use('/session', session_route_1.default);
}
exports.AddRouteSession = AddRouteSession;
function AddRouteJson(mainApp) {
    mainApp.use('/json', json_route_1.default);
}
exports.AddRouteJson = AddRouteJson;
function AdRoutedAdmin(mainApp) {
    mainApp.use('/admin', admin_route_1.default);
}
exports.AdRoutedAdmin = AdRoutedAdmin;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RedirectController_1 = __importDefault(require("./app/controllers/RedirectController"));
const UrlController_1 = __importDefault(require("./app/controllers/UrlController"));
const routes = express_1.Router();
routes.post('/encurtador', UrlController_1.default.store);
routes.get('/:urlHash', RedirectController_1.default.find);
routes.get('/', RedirectController_1.default.find);
exports.default = routes;

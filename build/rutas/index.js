"use strict";
//importaciones 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = require("../rutas/admin/admin");
var cliente_1 = require("../rutas/cliente/cliente");
//decalraciones
var routes = express_1.default();
//middlewares
routes.use(cliente_1.app);
routes.use(admin_1.app);
exports.default = routes;

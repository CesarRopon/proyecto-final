"use strict";
//importaciones 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = require("../rutas/admin/admin");
var cliente_1 = require("../rutas/cliente/cliente");
var ubicacionCliente_1 = require("../rutas/ubicacionCliente/ubicacionCliente");
var detallePedido_1 = require("../rutas/detallePedido/detallePedido");
var especialidad_1 = require("../rutas/especialidad/especialidad");
var pedido_1 = require("../rutas/pedido/pedido");
var producto_1 = require("../rutas/producto/producto");
var tamanio_1 = require("../rutas/tamanio/tamanio");
var comentarioCliente_1 = require("../rutas/comentariosCiente/comentarioCliente");
var tipopostre_1 = require("../rutas/tipopostre/tipopostre");
//decalraciones
var routes = express_1.default();
//middlewares
routes.use(cliente_1.app);
routes.use(admin_1.app);
routes.use(ubicacionCliente_1.app);
routes.use(detallePedido_1.app);
routes.use(especialidad_1.app);
routes.use(pedido_1.app);
routes.use(producto_1.app);
routes.use(tamanio_1.app);
routes.use(comentarioCliente_1.app);
routes.use(tipopostre_1.app);
exports.default = routes;

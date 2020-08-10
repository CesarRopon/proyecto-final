"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var pedido_model_1 = __importDefault(require("../../modelos/pedido.model"));
var app = express_1.Router();
exports.app = app;
app.get('/pedidos/:idPedido/detalles', function (req, res) {
    var idPedido = req.params.idPedido;
    pedido_model_1.default.find({ _id: idPedido }).populate('idCliente').populate('aJsnDetallePedido.idProducto').then(function (detallesPedido) {
        if (detallesPedido.length === 0) {
            return res.json({
                mensaje: "No hay pedido",
                contenido: "No existen pedidos"
            });
        }
        return res.status(200).json({
            mensaje: 'Detalles encontrados',
            contenido: detallesPedido
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.get('/pedidos/:idPedido/detalles/:idProducto', function (req, res) {
    var idPedido = req.params.idPedido;
    var idProducto = req.params.idProducto;
    pedido_model_1.default.find({ _id: idPedido, 'aJsnDetallePedido.idProducto': idProducto }).then(function (getPedido) {
        if (getPedido.length > 0) {
            return res.json({
                mensaje: "Ya existe",
                contenido: "Este producto ya esta en tu carrito"
            });
        }
        return res.json({
            mensaje: "No existe",
        });
    }).catch(function () {
        return res.json({
            mensaje: "Error interno",
        });
    });
});
app.post('/pedidos/:idPedido/detalles', function (req, res) {
    var idPedido = req.params.idPedido;
    var newDetalle = req.body;
    console.log('sadasdas');
    console.log(newDetalle);
    pedido_model_1.default.findByIdAndUpdate(idPedido, { $push: { 'aJsnDetallePedido': newDetalle } })
        .then(function (newDetailInserted) {
        if (!newDetailInserted) {
            return res.json({
                mensaje: "Error de detalle",
                contenido: "Detalle no insertado"
            });
        }
        return res.status(200).json({
            mensaje: "Detalle insertado",
            contenido: newDetailInserted
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.delete('/pedidos/:idPedido/detalles/:idDetalle', function (req, res) {
    var idPedido = req.params.idPedido;
    var idDetalle = req.params.idDetalle;
    //Si jala este delete
    pedido_model_1.default.findOneAndUpdate({ _id: idPedido }, { $pull: { 'aJsnDetallePedido': { '_id': idDetalle } } }).
        then(function (pedidoDeleted) {
        if (!pedidoDeleted) {
            return res.json({
                mensaje: "Detalle no eliminado",
                contenido: pedidoDeleted
            });
        }
        return res.status(200).json({
            mensaje: "Detalle eliminado",
            contenido: pedidoDeleted
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});

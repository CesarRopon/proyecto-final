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
    pedido_model_1.default.findById(idPedido).populate('aJsnDetallePedido.idProducto').then(function (detallesPedido) {
        if (!detallesPedido) {
            return res.json({
                mensaje: "No hay pedido"
            });
        }
        return res.status(200).json({
            mensaje: 'Detalles encontrados',
            detallesPedido: detallesPedido
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            err: err
        });
    });
});
app.post('/pedidos/:idPedido/detalles', function (req, res) {
    var idPedido = req.params.idPedido;
    var newDetalle = req.body;
    pedido_model_1.default.findByIdAndUpdate(idPedido, { $push: { 'aJsnDetallePedido': newDetalle } })
        .then(function (newDetailInserted) {
        if (!newDetailInserted) {
            return res.json({
                mensaje: "Detalle no insertado"
            });
        }
        return res.status(500).json({
            mensaje: "Detalle insertado",
            newDetailInserted: newDetailInserted
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            err: err
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
                pedidoDeleted: pedidoDeleted
            });
        }
        return res.status(200).json({
            mensaje: "Detalle eliminado",
            pedidoDeleted: pedidoDeleted
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            err: err
        });
    });
});

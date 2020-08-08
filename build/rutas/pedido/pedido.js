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
//Obtener todos los pedidos
app.get('/pedidos', function (req, res) {
    pedido_model_1.default.find({ blnStatus: false }).populate('idCliente').then(function (pedidos) {
        if (pedidos.length === 0) {
            return res.json({
                mensaje: "No hay pedidos",
                contenido: ""
            });
        }
        return res.status(200).json({
            mensaje: "Pedidos encontrados",
            contenido: pedidos
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.get('/pedidos/:idPedido', function (req, res) {
    var idPedido = req.params.idPedido;
    pedido_model_1.default.findById(idPedido).populate('idCliente').populate('idUbicacion').then(function (pedidoEspecifico) {
        if (!pedidoEspecifico) {
            return res.json({
                mensaje: "No se encontro el pedido",
                contenido: ""
            });
        }
        return res.status(200).json({
            mensaje: "Pedido encontrado",
            contenido: pedidoEspecifico
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.post('/pedidos', function (req, res) {
    var pedido = req.body;
    new pedido_model_1.default(pedido).save().then(function (newPedido) {
        if (!newPedido) {
            return res.json({
                mensaje: "No se pudo hacer el pedido",
                contenido: ""
            });
        }
        return res.json({
            mensaje: "Pedido hecho, espera confirmacion del vendedor",
            contenido: newPedido
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error en el servidor",
            contenido: err
        });
    });
});
app.put('/pedidos/:idPedido', function (req, res) {
    var idPedido = req.params.idPedido;
    var updatePedido = req.body;
    pedido_model_1.default.findByIdAndUpdate(idPedido, { $set: updatePedido }).then(function (pedidoUpdated) {
        if (!pedidoUpdated) {
            return res.json({
                mensaje: "No se pudo actualizar el pedido",
                contenido: ""
            });
        }
        return res.status(200).json({
            mensaje: "Pedido actualizado",
            contenido: pedidoUpdated
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.delete('/pedidos/:idPedido', function (req, res) {
    var idPedido = req.params.idPedido;
    if (idPedido.length < 24 || idPedido.length > 24) {
        return res.json({
            mensaje: "Error de id",
            contenido: "Este es un formato no valido para id's"
        });
    }
    pedido_model_1.default.findByIdAndUpdate(idPedido, { set: { blnStatus: true } }).then(function (pedido) {
        if (!pedido) {
            return res.status(404).json({
                mensaje: "Error de estatus",
                contenido: "No se pudo cambiar el estatus del pedido"
            });
        }
        return res.status(200).json({
            mensaje: "hecho",
            contenido: "Estatus cambiado"
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});

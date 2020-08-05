"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var cliente_model_1 = __importDefault(require("../../modelos/cliente.model"));
var verificarToken_1 = require("../../middlewares/verificarToken");
var app = express_1.Router();
exports.app = app;
//Obtener General
app.get('/clientes', verificarToken_1.verificaToken, function (req, res) {
    cliente_model_1.default.find({ blnActivo: true }).then(function (cliente) {
        if (cliente.length === 0) {
            return res.json({
                mensaje: "No se encontraron clientes",
                contenido: cliente
            });
        }
        return res.status(200).json({
            mensaje: "Datos encontrados",
            contenido: cliente
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Error al consultar datos del cliente",
            contenido: err
        });
    });
});
//Obtener Especifico
app.get('/clientes/:idCliente', function (req, res) {
    var idCliente = req.params.idCliente;
    cliente_model_1.default.findById(idCliente).then(function (cliente) {
        if (!cliente) {
            res.status(404).json({
                mensaje: "No se encontro el cliente",
                contenido: cliente
            });
        }
        return res.status(200).json({
            mensaje: "El cliente se encontro satisfactoriamente",
            contenido: cliente
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Ha habido un error",
            contenido: err
        });
    });
});
//Agregar 
app.post('/clientes', function (req, res) {
    var cliente = req.body;
    new cliente_model_1.default(cliente).save().then(function (cliente) {
        if (!cliente) {
            return res.status(404).json({
                mensaje: "Error",
                contenido: cliente
            });
        }
        return res.status(202).json({
            mensaje: "Se registro el cliente exitosamente",
            contenido: cliente
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Ha ocurrido un error al registrar el cliente",
            contenido: err
        });
    });
});
//Eliminar
app.delete('/clientes/:idCliente', function (req, res) {
    var idCliente = req.params.idCliente;
    cliente_model_1.default.findByIdAndRemove(idCliente).then(function (cliente) {
        if (!cliente) {
            return res.status(404).json({
                mensaje: "No se encontro el cliente a eliminar",
                contenido: cliente
            });
        }
        return res.status(200).json({
            msg: "Se elimino al cliente",
            contenido: cliente
        });
    }).catch(function (err) {
        return res.json(500).json({
            msg: "Ocurrio un error",
            contenido: err
        });
    });
});
//Actualizar
app.put('/clientes/:idCliente', function (req, res) {
    var idCliente = req.params.idCliente;
    var cliente = new cliente_model_1.default(req.body);
    cliente._id = idCliente;
    cliente_model_1.default.findByIdAndUpdate(idCliente, { $set: cliente }).then(function (clienteRes) {
        if (!clienteRes) {
            return res.status(404).json({
                mensaje: "No se encontro el cliente",
                contenido: clienteRes
            });
        }
        return res.status(200).json({
            mensaje: "Se actualizo satisfactoriamente",
            contenido: clienteRes
        });
    }).catch(function (err) {
        res.status(500).json({
            mensaje: "Hubo un error",
            contenido: err
        });
    });
});

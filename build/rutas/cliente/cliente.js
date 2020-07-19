"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var cliente_model_1 = __importDefault(require("../../modelos/cliente.model"));
var app = express_1.Router();
exports.app = app;
//Obtener General
app.get('/clientes', function (req, res) {
    cliente_model_1.default.find().then(function (cliente) {
        if (cliente.length <= 0) {
            return res.status(404).json({
                msg: "No se encontraron datos",
                cont: {
                    cliente: cliente
                }
            });
        }
        return res.status(200).json({
            msg: "Datos encontrados",
            cont: {
                cliente: cliente
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Error al consultar datos del cliente",
            cont: {
                err: err
            }
        });
    });
});
//Obtener Especifico
app.get('/clientes/:idClientes', function (req, res) {
    var idCliente = req.params.idCliente;
    cliente_model_1.default.findById(idCliente).then(function (cliente) {
        if (!cliente) {
            res.status(404).json({
                msg: "No se encontro el cliente",
                cont: {
                    cliente: cliente
                }
            });
        }
        return res.status(200).json({
            msg: "El cliente se encontro satisfactoriamente",
            cont: {
                cliente: cliente
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Ha habido un error",
            cont: {
                err: err
            }
        });
    });
});
//Agregar 
app.post('/clientes', function (req, res) {
    var cliente = req.body;
    new cliente_model_1.default(cliente).save().then(function (cliente) {
        if (!cliente) {
            return res.status(404).json({
                msg: "Error",
                cont: {
                    cliente: cliente
                }
            });
        }
        return res.status(202).json({
            msg: "Se registro el cliente exitosamente",
            contenido: {
                cliente: cliente
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Ha ocurrido un error al registrar el cliente",
            contenido: {
                err: err
            }
        });
    });
});
//Eliminar
app.delete('/clientes/:idCliente', function (req, res) {
    var idCliente = req.params.idCliente;
    cliente_model_1.default.findByIdAndRemove(idCliente).then(function (cliente) {
        if (!cliente) {
            return res.status(404).json({
                msg: "No se encontro el cliente a eliminar",
                cont: {
                    cliente: cliente
                }
            });
        }
        return res.status(200).json({
            msg: "Se elimino al cliente",
            cont: {
                cliente: cliente
            }
        });
    }).catch(function (err) {
        return res.json(500).json({
            msg: "Ocurrio un error",
            cont: {
                err: err
            }
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
                msg: "No se encontro el cliente",
                cont: {
                    clienteRes: clienteRes
                }
            });
        }
        return res.status(200).json({
            msg: "Se actualizo satisfactoriamente",
            cont: {
                clienteRes: clienteRes
            }
        });
    }).catch(function (err) {
        res.status(500).json({
            msg: "Hubo un error",
            cont: {
                err: err
            }
        });
    });
});

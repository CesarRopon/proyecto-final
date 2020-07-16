"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var ubicacionCliente_model_1 = __importDefault(require("../../modelos/ubicacionCliente.model"));
var cliente_model_1 = __importDefault(require("../../modelos/cliente.model"));
var app = express_1.Router();
exports.app = app;
app.post('/clientes/:idCliente/ubicaciones', function (req, res) {
    var idCliente = req.params.idCliente;
    var ubicacion = new ubicacionCliente_model_1.default(req.body);
    cliente_model_1.default.findByIdAndUpdate(idCliente, { $push: { aJsnUbicacion: ubicacion } }).then(function (cliente) {
        if (!cliente) {
            return res.status(404).json({
                msg: "La persona a la que desea agregar ubicacion nose encuentra.",
                cont: {
                    cliente: cliente
                }
            });
        }
        return res.status(500).json({
            msg: "Ubicacion agregada",
            cont: {
                cliente: cliente
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Error interno: " + err
        });
    });
});

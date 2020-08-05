"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var tipoPostre_model_1 = __importDefault(require("../../modelos/tipoPostre.model"));
var app = express_1.Router();
exports.app = app;
app.get('/tipospostre', function (req, res) {
    tipoPostre_model_1.default.find({ blnActivo: true }).then(function (tipos) {
        if (tipos.length === 0) {
            return res.json({
                mensaje: "Tipos no encontrados",
                contenido: {
                    tipos: tipos
                }
            });
        }
        return res.status(202).json({
            mensaje: "Tipos encontrados",
            contenido: {
                tipos: tipos
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contendio: {
                err: err
            }
        });
    });
});
app.get('/tipospostre/:idTipo', function (req, res) {
    var idTipo = req.params.idTipo;
    tipoPostre_model_1.default.findById(idTipo).then(function (tipo) {
        if (!tipo) {
            return res.json({
                mensaje: "No se encontro el tipo",
                contenido: {
                    tipo: tipo
                }
            });
        }
        return res.status(200).json({
            mensaje: "Encontrado",
            contenido: tipo
        });
    });
});
app.put('/tipospostre/:idTipo', function (req, res) {
    var idTipo = req.params.idTipo;
    var typeUdated = req.body;
    tipoPostre_model_1.default.findByIdAndUpdate(idTipo, { $set: typeUdated }).then(function (tipo) {
        if (!tipo) {
            return res.status(404).json({
                mensaje: "No encontrado",
                contenido: tipo
            });
        }
        return res.status(200).json({
            mensaje: "Documento actualizado",
            contenido: tipo
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.post('/tipospostre', function (req, res) {
    var newTipo = req.body;
    new tipoPostre_model_1.default(newTipo).save().then(function (tipo) {
        if (!tipo) {
            return res.json({
                mensaje: "No agregado"
            });
        }
        return res.status(202).json({
            mensaje: "Agregado exitosamente",
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno"
        });
    });
});
app.delete('/tipospostre/:idTipo', function (req, res) {
    var idTipo = req.params.idTipo;
    tipoPostre_model_1.default.findByIdAndRemove(idTipo).then(function (tipos) {
        if (!tipos) {
            return res.status(404).json({
                mensaje: "No eliminado",
                contenido: tipos
            });
        }
        return res.status(200).json({
            mensaje: "Dado de baja",
            contenido: tipos
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});

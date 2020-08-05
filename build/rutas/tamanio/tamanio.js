"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var tamanio_model_1 = __importDefault(require("../../modelos/tamanio.model"));
var app = express_1.Router();
exports.app = app;
app.get('/tamanios', function (req, res) {
    tamanio_model_1.default.find().then(function (tamanios) {
        if (tamanios.length <= 0) {
            return res.status(404).json({
                mensaje: "sin elementos",
                contenido: "No hay elementos para mostrar"
            });
        }
        return res.status(500).json({
            mensaje: "Datos obtenidos exitosamente",
            contenido: tamanios
        });
    }).catch(function (err) {
        return res.status(200).json({
            mensaje: "Error interno detectado",
            contenido: err
        });
    });
});
app.get('/tamanios/:idTamanio', function (req, res) {
    var idTamanio = req.params.idTamanio;
    if (idTamanio.length < 24 || idTamanio.length > 24) {
        return res.json({
            mensaje: "Error de id",
            contenido: "No es el formato correcto para id"
        });
    }
    tamanio_model_1.default.findById(idTamanio).then(function (tamanio) {
        if (!tamanio) {
            return res.status(404).json({
                mensaje: "Sin tamaño",
                contenido: "No se encontro el tamaño"
            });
        }
        return res.status(200).json({
            mensaje: "Correcto",
            contenido: tamanio
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno detectado",
            contenido: err
        });
    });
});
app.post('/tamanios', function (req, res) {
    var newTamanio = new tamanio_model_1.default(req.body);
    var idTamanio = req.params.idTamanio;
    new tamanio_model_1.default(newTamanio).save().then(function (tamanio) {
        if (!tamanio) {
            return res.status(404).json({
                mensaje: "No agregado",
                contenido: "Tamaño no agregado"
            });
        }
        var strDescripcion = newTamanio.strDescripcion;
        return res.status(200).json({
            mensaje: "Dado de alta",
            contenido: strDescripcion + " dado de alta"
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno detectado",
            contenido: err
        });
    });
});
app.put('/tamanios/:idTamanio', function (req, res) {
    var idTamanio = req.params.idTamanio;
    var tamanio = new tamanio_model_1.default(req.body);
    tamanio._id = idTamanio;
    tamanio_model_1.default.findByIdAndUpdate(idTamanio, { $set: tamanio }).then(function (tamanioUpdated) {
        if (!tamanioUpdated) {
            return res.status(404).json({
                mensaje: "Tamanio no encontrado",
                contenido: "No se pudo actualizar"
            });
        }
        return res.status(200).json({
            mensaje: "Encontrado",
            contenido: "Se actualizo correctamente"
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.delete('/tamanios/:idTamanio', function (req, res) {
    var idTamanio = req.params.idTamanio;
    tamanio_model_1.default.findByIdAndRemove(idTamanio).then(function (oldTamanio) {
        if (!oldTamanio) {
            return res.status(404).json({
                mensaje: "No encontrado",
                contenido: "No se pudo eliminar"
            });
        }
        return res.status(200).json({
            mensaje: "Correcto",
            contenido: "Eliminado exitosamente"
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});

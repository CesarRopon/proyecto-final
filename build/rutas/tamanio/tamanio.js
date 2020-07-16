"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tamanio_model_1 = __importDefault(require("../../modelos/tamanio.model"));
var app = express_1.Router();
app.get('/tamanios', function (req, res) {
    tamanio_model_1.default.find().then(function (tamanios) {
        if (tamanios.length <= 0) {
            return res.status(404).json({
                msg: "No hay elementos para mostrar"
            });
        }
        return res.status(500).json({
            msg: "Datos obtenidos exitosamente",
            cont: {
                tamanios: tamanios
            }
        });
    }).catch(function (err) {
        return res.status(200).json({
            msg: "Error interno detectado",
            cont: {
                err: err
            }
        });
    });
});
app.get('/tamanios/:idTamanio', function (req, res) {
    var idTamanio = req.params.idTamanio;
    tamanio_model_1.default.findById(idTamanio).then(function (tamanio) {
        if (!tamanio) {
            return res.status(404).json({
                msg: "No se encontro el tamaño"
            });
        }
        return res.status(200).json({
            msg: "Correcto",
            cont: {
                tamanio: tamanio
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Error interno detectado",
            cont: {
                err: err
            }
        });
    });
});
app.post('/tamanios', function (req, res) {
    var tamanio = new tamanio_model_1.default(req.body);
    var idTamanio = req.params.idTamanio;
    tamanio_model_1.default.findById(idTamanio).then(function (tamanio) {
        if (!tamanio) {
            return res.status(404).json({
                msg: "No se encontro el tamaño"
            });
        }
        return res.status(200).json({
            msg: "Correcto",
            cont: {
                tamanio: tamanio
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Error interno detectado",
            cont: {
                err: err
            }
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
                msg: "Tamaño no encontrado"
            });
        }
        return res.status(200).json({
            msg: "Datos actualizados correctamente",
            cont: {
                tamanioUpdated: tamanioUpdated
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: err
        });
    });
});
app.delete('/tamanios/:idTamanio', function (req, res) {
    var idTamanio = req.params.idTamanio;
    tamanio_model_1.default.findByIdAndRemove(idTamanio).then(function (oldTamanio) {
        if (!oldTamanio) {
            return res.status(404).json({
                msg: "No se encontro ese documento"
            });
        }
        return res.status(200).json({
            msg: "Eliminado exitosamente"
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: err
        });
    });
});

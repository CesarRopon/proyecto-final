"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var ubicacionCliente_model_1 = __importDefault(require("../../modelos/ubicacionCliente.model"));
var app = express_1.Router();
exports.app = app;
app.get('/clientes/:idCliente/ubicaciones', function (req, res) {
    var idCliente = req.params.idCliente;
    if (idCliente.length < 24) {
        return res.status(404).json({
            mensaje: "[ID invalido]",
            contenido: "El id del cliente es invalido"
        });
    }
    ubicacionCliente_model_1.default.find({ idCliente: idCliente }).then(function (ubicaciones) {
        if (ubicaciones.length == 0) {
            return res.status(404).json({
                mensaje: "Error",
                contenido: "No hay ubicaciones"
            });
        }
        return res.status(200).json({
            mensaje: "Pedidos encontrados",
            contenido: ubicaciones
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.get('/clientes/:idCliente/ubicaciones/:idUbicacion', function (req, res) {
    var idCliente = req.params.idCliente;
    var idUbicacion = req.params.idUbicacion;
    if (idCliente.length < 24 || idCliente.length > 24) {
        return res.status(404).json({
            mensaje: "[ID invalido]",
            contenido: "El id del cliente es invalido"
        });
    }
    else if (idUbicacion.length < 24 || idUbicacion.length > 24) {
        return res.status(404).json({
            mensaje: "[ID invalido]",
            contenido: "El id de la ubicacion es invalido"
        });
    }
    ubicacionCliente_model_1.default.find({ _id: idUbicacion, idCliente: idCliente }).then(function (ubicacion) {
        if (ubicacion.length == 0) {
            return res.status(404).json({
                mensaje: "Vacio",
                contenido: "No existe esa ubicacion"
            });
        }
        return res.status(202).json({
            mensaje: "Ubicacion",
            contenido: ubicacion
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.post('/clientes/:idClientes/ubicaciones', function (req, res) {
    var newUbicacion = req.body;
    var idCliente = req.params.idCliente;
    new ubicacionCliente_model_1.default(newUbicacion).save().then(function (ubicacion) {
        if (!ubicacion) {
            return res.status(404).json({
                mensaje: "[Insercion error]",
                contenido: "Error de insercion"
            });
        }
        return res.status(200).json({
            mensaje: "Insercion exitosa",
            contenido: ubicacion
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "[Error interno]",
            contenido: err
        });
    });
});
app.put('/clientes/:idCliente/ubicaciones/:idUbicacion', function (req, res) {
    var ubicacionUpdated = req.body;
    var idUbicacion = req.params.idUbicacion;
    if (idUbicacion.length < 23) {
        return res.status(404).json({
            mensaje: "Id error",
            contenido: "El id de la ubicacion debe contener 24 caracteres"
        });
    }
    ubicacionCliente_model_1.default.findByIdAndUpdate(idUbicacion, { $set: ubicacionUpdated }).then(function (ubicacion) {
        if (!ubicacion) {
            return res.status(404).json({
                mensaje: "No actualizado",
                contenido: "No se pudo actualizar la ubicacion"
            });
        }
        return res.status(200).json({
            mensaje: "Actualizado",
            contenido: "Se actualizo correctamente"
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.delete('/clientes/:idCliente/ubicaciones/:idUbicacion', function (req, res) {
    var idCliente = req.params.idCliente;
    var idUbicacion = req.params.idUbicacion;
    if (idCliente.length < 24 || idCliente.length > 24) {
        return res.status(404).json({
            mensaje: "Error id",
            contenido: "El id de cliente no es invalido"
        });
    }
    else if (idUbicacion.length < 24 || idUbicacion.length > 24) {
        return res.status(404).json({
            mensaje: "Error id",
            contenido: "El id de Ubicacion no es invalido"
        });
    }
    ubicacionCliente_model_1.default.findOneAndDelete({ _id: idUbicacion, idCliente: idCliente }).then(function (ubicacion) {
        if (!ubicacion) {
            return res.json({
                mensaje: "Error de eliminacion",
                contenido: "No pudo eliminarse, intenta de nuevo"
            });
        }
        return res.status(200).json({
            mensaje: "Eliminado",
            contenido: "ubicacion eliminada"
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});

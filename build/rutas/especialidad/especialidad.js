"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var especialidad_model_1 = __importDefault(require("../../modelos/especialidad.model"));
var app = express_1.Router();
exports.app = app;
app.get('/especialidades', function (req, res) {
    especialidad_model_1.default.find().then(function (especialidades) {
        if (especialidades.length == 0) {
            return res.json({
                mensaje: "No hay especialidades",
                contenido: "No hay especialidades registradas"
            });
        }
        return res.status(200).json({
            mensaje: "Especialidades",
            contenido: especialidades
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.get('/especialidades/:idEspecialidad', function (req, res) {
    var idEspecialidad = req.params.idEspecialidad;
    if (idEspecialidad.length < 24) {
        return res.json({
            mensaje: "Error de id",
            contenido: "El id de la especialidad"
        });
    }
    especialidad_model_1.default.findById(idEspecialidad).then(function (especialidad) {
        if (!especialidad) {
            return res.status(404).json({
                mensaje: "Error",
                contenido: "No existe esa especialidad"
            });
        }
        return res.status(202).json({
            mensaje: "Encontrado",
            contenido: especialidad
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.post('/especialidades', function (req, res) {
    var newEspecialidad = req.body;
    new especialidad_model_1.default(newEspecialidad).save().then(function (newEspec) {
        if (!newEspec) {
            return res.status(4040).json({
                mensaje: "Error de insercion",
                contenido: "No se pudo dar de alta la especialidad"
            });
        }
        return res.status(202).json({
            mensaje: "Insertado",
            contenido: newEspec
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.put('/especialidades/:idEspecialidad', function (req, res) {
    var idEspecialidad = req.params.idEspecialidad;
    var especUpdated = req.body;
    console.log(idEspecialidad);
    console.log(especUpdated);
    if (idEspecialidad.length < 24) {
        return res.json({
            mensaje: "Error de id",
            contenido: "Este id no es valido para id especialidad"
        });
    }
    especialidad_model_1.default.findByIdAndUpdate(idEspecialidad, { $set: especUpdated }).then(function (especialidad) {
        if (!especialidad) {
            return res.status(404).json({
                mensaje: "Error de actualizacion",
                contenido: "No se pudo hacer la actualizacion"
            });
        }
        var strDescripcion = especialidad.strDescripcion;
        return res.status(200).json({
            mensaje: "Actualizado",
            contenido: "Se actualizo la especialidad " + strDescripcion
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.delete('/especialidades/:idEspecialidad', function (req, res) {
    var idEspecialidad = req.params.idEspecialidad;
    if (idEspecialidad.length < 24) {
        return res.status(404).json({
            mensaje: "Error de id",
            contenido: "Este id para especialidad no es valido"
        });
    }
    especialidad_model_1.default.findByIdAndDelete(idEspecialidad).then(function (oldEspec) {
        if (!oldEspec) {
            return res.status(404).json({
                mensaje: "No eliminado",
                contenido: "No se pudo eliminar esta especialidad"
            });
        }
        return res.status(200).json({
            mensaje: "Correcto",
            contenido: "Se elimino esta especialidad"
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});

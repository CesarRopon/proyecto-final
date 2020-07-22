"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//Importaciones necesarias
var express_1 = require("express");
var admin_model_1 = __importDefault(require("../../modelos/admin.model"));
//declaraciones
var app = express_1.Router();
exports.app = app;
//
app.get('/admin', function (req, res) {
    admin_model_1.default.find().then(function (persona) {
        return res.status(200).json({
            mensaje: "Todo bien, todo correcto",
            contenido: {
                persona: persona
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: err
        });
    });
});
app.post('/admin', function (req, res) {
    var admin = req.body;
    new admin_model_1.default(admin).save().then(function (administrador) {
        if (!administrador) {
            return res.status(404).json({
                msg: "0",
                err: "Ha ocurrido un error, intentalo de nuevo"
            });
        }
        return res.status(200).json({
            msg: "Administrador dado de alta",
            cont: {
                administrador: administrador
            }
        });
    }).catch(function (err) {
        return res.json({
            msg: "0",
            err: "Te han faltado campos por llenar"
        });
    });
});
app.put('/admin/:idAdmin', function (req, res) {
    var idAdmin = req.params.idAdmin;
    var admin = req.body;
    admin._id = idAdmin;
    admin_model_1.default.findByIdAndUpdate(idAdmin, { $set: admin }).then(function (newPersona) {
        if (!newPersona) {
            return res.status(404).json({
                msg: "No se encontro el id " + idAdmin
            });
        }
        var strNombre = newPersona.strNombre, strApellidos = newPersona.strApellidos;
        return res.status(200).json({
            msg: "se actualizo corectamente el usuario " + strNombre + " " + strApellidos,
            cont: {
                newPersona: newPersona
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Algo salio mal",
            cont: {
                err: err
            }
        });
    });
});
//get especifico by email
app.get('/admin/:strEmail', function (req, res) {
    var strEmail = req.params.strEmail;
    admin_model_1.default.find({ strEmail: strEmail }).then(function (persona) {
        if (persona.length > 0) {
            return res.status(200).json({
                mensaje: "Todo bien, todo correcto",
                contenido: {
                    persona: persona
                }
            });
        }
        return res.json({
            msg: "Usuario no encontrado"
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: err
        });
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var comentario_model_1 = __importDefault(require("../../modelos/comentario.model"));
var app = express_1.Router();
exports.app = app;
//Traer todos los comentarios de un cliente
app.get('/clientes/:idCliente/comentarios', function (req, res) {
    var idCliente = req.params.idCliente;
    comentario_model_1.default.find({ idCliente: idCliente }).populate('idCliente').then(function (comentariosCliente) {
        if (comentariosCliente.length === 0) {
            return res.json({
                mensaje: "No hay comentarios",
                comentariosCliente: comentariosCliente
            });
        }
        return res.status(202).json({
            mensaje: "Comentarios encontrados",
            comentariosCliente: comentariosCliente
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "No encontrados",
            err: err
        });
    });
});
//Nuevo comentario 
app.post('/clientes/:idCliente/comentarios', function (req, res) {
    var newComment = req.body;
    new comentario_model_1.default(newComment).save().then(function (nuevoComm) {
        if (!nuevoComm) {
            return res.json({
                mensaje: "No enviado",
                nuevoComm: nuevoComm
            });
        }
        return res.json({
            mensaje: "Enviado",
            nuevoComm: nuevoComm
        });
    }).catch(function (err) {
        return res.json({
            mensaje: err
        });
    });
});
//Encontrar un comentario y contestarlo
app.put('/clientes/:idCliente/comentarios/:idComentario', function (req, res) {
    var idCliente = req.params.idCliente;
    var idComentario = req.params.idComentario;
    var contestacion = req.body;
    comentario_model_1.default.findByIdAndUpdate(idComentario, { $set: contestacion }).then(function (contestacionAdmin) {
        if (!contestacionAdmin) {
            return res.json({
                mensaje: "No contestado",
                contestacionAdmin: contestacionAdmin
            });
        }
        return res.status(200).json({
            mensaje: "Contestado correctamente",
            contestacionAdmin: contestacionAdmin
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            err: err
        });
    });
});
//Obtener un comentario
app.get('/clientes/:idCliente/comentarios/:idComentario', function (req, res) {
    var idCliente = req.params.idCliente;
    var idComentario = req.params.idComentario;
    comentario_model_1.default.findById(idComentario).then(function (comentarioCliente) {
        if (!comentarioCliente) {
            return res.json({
                mensaje: "Comentario no encontrado",
                comentarioCliente: comentarioCliente
            });
        }
        return res.status(200).json({
            mensaje: "Comentario encontrado",
            comentarioCliente: comentarioCliente
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            err: err
        });
    });
});

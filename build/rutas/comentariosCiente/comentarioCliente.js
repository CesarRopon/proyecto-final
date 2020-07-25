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
//Traer todos los comentarios de un cliente
app.get('/clientes/:idCliente/comentarios', function (req, res) {
    var idCliente = req.params.idCliente;
    cliente_model_1.default.findById(idCliente).then(function (comentariosCliente) {
        if (!comentariosCliente) {
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
    var idCliente = req.params.idCliente;
    var newComment = req.body;
    cliente_model_1.default.findByIdAndUpdate(idCliente, { $push: { aJsnComentario: newComment } }).then(function (nuevoComm) {
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
    cliente_model_1.default.findOneAndUpdate({ _id: idCliente }, { 'aJsnComentario._id': idComentario }).then(function (contestacionAdmin) {
        if (!contestacionAdmin) {
            return res.status(400).json({
                mensaje: "No hay comentarios",
                contestacionAdmin: contestacionAdmin
            });
        }
        return res.status(200).json({
            mensaje: "Mensajes encontrados",
            contestacionAdmin: contestacionAdmin
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "No encontrados",
            contestacionAdmin: {
                err: err
            }
        });
    });
});
app.get('/clientes/:idCliente/comentarios/:idComentario', function (req, res) {
    var idCliente = req.params.idCliente;
    var idComentario = req.params.idComentario;
    var posicion = req.body;
    var returnComent;
    cliente_model_1.default.findById(idCliente, { 'aJsnComentario._id': idComentario }).populate('aJsnComentario').then(function (comentarioCliente) {
        if (!comentarioCliente) {
            returnComent;
            return res.json({
                mensaje: "Comentario no encontrado",
                comentarioCliente: {
                    returnComent: returnComent
                }
            });
        }
        returnComent = comentarioCliente.aJsnComentario[posicion];
        return res.status(200).json({
            mensaje: "Comentario encontrado",
            comentarioCliente: comentarioCliente,
            returnComent: returnComent
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error interno",
            err: err
        });
    });
});

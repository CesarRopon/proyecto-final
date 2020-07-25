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
//Traer todos los comentarios
app.get('/comentarios', function (req, res) {
    comentario_model_1.default.find({ blnStatus: false }).then(function (comentarios) {
        if (comentarios.length === 0) {
            return res.json({
                mensaje: "No hay comentarios",
                comentarios: comentarios
            });
        }
        return res.status(202).json({
            mensaje: "Comentarios encontrados",
            comentarios: comentarios
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "No encontrados",
            err: err
        });
    });
    /*
    clienteModel.find().select('strNombre strApellidos aJsnComentario').then((comentarios: ICliente[]) =>{
        if(comentarios.length===0){
            return res.status(400).json({
                mensaje: "No hay comentarios",
                comentarios
            })
        }

        return res.status(200).json({
            mensaje:"Mensajes encontrados",
            comentarios
        })

    }).catch((err: any) =>{
           return res.status(500).json({
               mensaje:"No encontrados",
               contenido:{
                   err
               }
           })
    })*/
});
//Nuevo comentario 
app.post('/comentarios', function (req, res) {
    var newComment = req.body;
    new comentario_model_1.default(newComment).save().then(function (nuevoComm) {
        if (!nuevoComm) {
            return res.json({
                mensaje: "no enviado",
                nuevoComm: nuevoComm
            });
        }
        return res.json({
            mensaje: "enviado",
            nuevoComm: nuevoComm
        });
    }).catch(function (err) {
        return res.json({
            mensaje: err
        });
    });
});
//Obtener comentarios por  fecha
app.get('/clientes/:idCliente/comentarios/:dteFecha', function (req, res) {
    var idCliente = req.params.idCliente;
    var fecha = req.params.dteFecha;
    comentario_model_1.default.find({ idCliente: idCliente, dteFechaComentario: fecha }).then(function (comentariosCliente) {
        if (comentariosCliente.length === 0) {
            return res.status(400).json({
                mensaje: "No hay comentarios",
                contenido: {
                    comentariosCliente: comentariosCliente
                }
            });
        }
        return res.status(200).json({
            mensaje: "Mensajes encontrados",
            contenido: {
                comentariosCliente: comentariosCliente
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "No encontrados",
            contenido: {
                err: err
            }
        });
    });
});
app.put('/comentarios/:idComentario', function (req, res) {
    var idComentario = req.params.idComentario;
    var respuesta = req.body;
    comentario_model_1.default.findByIdAndUpdate(idComentario, { $set: respuesta }).then(function (commentAnswered) {
        if (!commentAnswered) {
            return res.json({
                mensaje: "Respuesta no enviada",
            });
        }
        return res.status(200).json({
            mensaje: "Comentario enviado"
        });
    }).catch(function (err) {
        return res.json({
            mensaje: err
        });
    });
});
//Obtener todos los comentarios por id
app.get('/clientes/:idCliente/comentarios/', function (req, res) {
    var idCliente = req.params.idCliente;
    comentario_model_1.default.find({ blnStatus: true, idCliente: idCliente }).select('idCliente dteFechaComentario strComentario blnStatus').then(function (comentariosCliente) {
        if (comentariosCliente.length === 0) {
            return res.json({
                mensaje: "No hay comentarios",
                contenido: {
                    comentariosCliente: comentariosCliente
                }
            });
        }
        return res.status(200).json({
            mensaje: "Comentarios encontrados",
            contenido: {
                comentariosCliente: comentariosCliente
            }
        });
    }).catch(function (err) {
        res.status(500).json({
            mensaje: "Error del servidor",
            contenido: {
                err: err
            }
        });
    });
});

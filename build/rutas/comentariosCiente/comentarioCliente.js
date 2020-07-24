"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var comentario_model_1 = __importDefault(require("../../modelos/comentario.model"));
var cliente_model_1 = __importDefault(require("../../modelos/cliente.model"));
var app = express_1.Router();
exports.app = app;
//Traer todos los comentarios
/*app.get('/comentarios', (req:Request, res:Response) =>{

    comentarioModel.find().then((comentarios: IComentario[]) =>{
        if(comentarios.length===0){
            return res.status(400).json({

            })
        }

        return res.status(200).json({
            mensaje:"Mensajes encontrados",
            contenido: {
                comentarios
            }
        })
    }).catch((err: any) =>{
           return res.status(500).json({
               mensaje:"No encontrados",
               contenido:{
                   err
               }
           })
    })
})*/
//Obtener comentarios por idCLiente y fecha
app.get('/clientes/:idCliente/comentarios/:dteFecha', function (req, res) {
    var idCliente = req.params.idCliente;
    var fecha = req.params.dteFecha;
    cliente_model_1.default.find({ 'aJsnComentario.dteFechaComentario': fecha, _id: idCliente }).select('aJsnComentario.dteFechaComentario aJsnComentario.strComentario aJsnComentario.blnStatus').then(function (comentariosCliente) {
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
//Obtener todos los comentarios
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

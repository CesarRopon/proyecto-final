import {Router, Request, Response} from 'express';
import comentarioModel, {IComentario} from '../../modelos/comentario.model';
import clienteModel, {ICliente} from '../../modelos/cliente.model';
import { model } from 'mongoose';


const app : Router = Router();

//Traer todos los comentarios de un cliente
app.get('/clientes/:idCliente/comentarios', (req:Request, res:Response) =>{

    let idCliente: string= req.params.idCliente;
    comentarioModel.find({idCliente:idCliente}).populate('idCliente').then((comentariosCliente: IComentario[]) =>{
    if(comentariosCliente.length===0){
        return res.json({
            mensaje: "No hay comentarios",
            comentariosCliente
        })
    }
        return res.status(202).json({
        mensaje:"Comentarios encontrados",
        comentariosCliente
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"No encontrados",
            err
        })
    } )
})

//Nuevo comentario 
app.post('/clientes/:idCliente/comentarios',( req :Request, res:Response) =>{

    let newComment :IComentario = req.body;
    

    new comentarioModel(newComment).save().then((nuevoComm:IComentario| null ) =>{
        if(!nuevoComm){
            return res.json({
                mensaje: "No enviado",
                nuevoComm
            })
        }

        return res.json({
            mensaje: "Enviado",
            nuevoComm
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje: err
        })
    })

})



//Encontrar un comentario y contestarlo
app.put('/clientes/:idCliente/comentarios/:idComentario', (req:Request, res:Response) =>{
    let idCliente: string = req.params.idCliente;
    let idComentario: string = req.params.idComentario;
    let contestacion : IComentario = req.body;

    comentarioModel.findByIdAndUpdate(idComentario, {$set: contestacion}).then((contestacionAdmin: IComentario |null) =>{
        if(!contestacionAdmin){
            return res.json({
                mensaje:"No contestado",
                contestacionAdmin
            })
        }

        return res.status(200).json({
            mensaje: "Contestado correctamente",
            contestacionAdmin
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje:"Error interno",
            err
        })
    })
})

//Obtener un comentario
app.get('/clientes/:idCliente/comentarios/:idComentario', (req:Request, res:Response) =>{
    
    let idCliente: string= req.params.idCliente;
    let idComentario : string = req.params.idComentario;

    comentarioModel.findById(idComentario).then((comentarioCliente: IComentario | null) =>{
        
        if(!comentarioCliente){
            return res.json({
                mensaje:"Comentario no encontrado",
                comentarioCliente
            })    
        }
        return res.status(200).json({
            mensaje:"Comentario encontrado",
            comentarioCliente
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"Error interno",
            err
        })
    })
})


export {app};
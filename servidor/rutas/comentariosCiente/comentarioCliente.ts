import {Router, Request, Response} from 'express';
import comentarioModel, {IComentario} from '../../modelos/comentario.model';
import clienteModel, {ICliente} from '../../modelos/cliente.model';
import { model } from 'mongoose';


const app : Router = Router();

//Traer todos los comentarios
app.get('/comentarios', (req:Request, res:Response) =>{

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
})


//Obtener comentarios por idCLiente y fecha
app.get('/clientes/:idCliente/comentarios/:dteFecha', (req:Request, res:Response) =>{
    let idCliente: string = req.params.idCliente;
    let fecha: string = req.params.dteFecha;

    
    clienteModel.find({'aJsnComentario.dteFechaComentario':fecha , _id:idCliente}).select('aJsnComentario.dteFechaComentario aJsnComentario.strComentario aJsnComentario.blnStatus -_id').then((comentariosCliente: ICliente[]) =>{
        if(comentariosCliente.length===0){
            return res.status(400).json({
                mensaje:"No hay comentarios",
                contenido:{
                    comentariosCliente
                }
            })    
        }
        return res.status(200).json({
            mensaje:"Mensajes encontrados",
            contenido: {
                comentariosCliente
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
})

export {app};
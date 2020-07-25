import {Router, Request, Response} from 'express';
import comentarioModel, {IComentario} from '../../modelos/comentario.model';
import clienteModel, {ICliente} from '../../modelos/cliente.model';
import { model } from 'mongoose';


const app : Router = Router();

//Traer todos los comentarios de un cliente
app.get('/clientes/:idCliente/comentarios', (req:Request, res:Response) =>{

    let idCliente: string= req.params.idCliente;
    clienteModel.findById(idCliente).then((comentariosCliente: ICliente| null) =>{
    if(!comentariosCliente){
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

    let idCliente: string = req.params.idCliente;
    let newComment :IComentario = req.body;
    

    clienteModel.findByIdAndUpdate(idCliente, {$push:{aJsnComentario:newComment}}).then((nuevoComm:ICliente| null ) =>{
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
    let idComentario: string = req.params.idComentario
    let contestacion : IComentario = req.body

    
    clienteModel.findOneAndUpdate({_id:idCliente}, {'aJsnComentario._id': idComentario}).then((contestacionAdmin:ICliente | null) =>{
        if(!contestacionAdmin){
            return res.status(400).json({
                mensaje:"No hay comentarios",
                contestacionAdmin
                
            })    
        }
        return res.status(200).json({
            mensaje:"Mensajes encontrados",
            contestacionAdmin
        })
    }).catch((err: any) =>{
           return res.status(500).json({
               mensaje:"No encontrados",
                contestacionAdmin:{
                    err
                }
           }) 
    })
})


app.get('/clientes/:idCliente/comentarios/:idComentario', (req:Request, res:Response) =>{
    
    let idCliente: string= req.params.idCliente;
    let idComentario : string = req.params.idComentario;
    let posicion: number = req.body;
    let returnComent:IComentario;
    clienteModel.findById(idCliente,{'aJsnComentario._id': idComentario}).populate('aJsnComentario').then((comentarioCliente: ICliente | null) =>{
        
        
        if(!comentarioCliente){
            returnComent
            return res.json({
                mensaje:"Comentario no encontrado",
                comentarioCliente:{
                    returnComent
                }
            })    
        }
        returnComent = comentarioCliente.aJsnComentario[posicion];
        return res.status(200).json({
            mensaje:"Comentario encontrado",
            comentarioCliente,
            returnComent
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"Error interno",
            err
        })
    })
})
/*
app.put('/comentarios/:idComentario', (req:Request, res:Response) =>{

    let idComentario :string = req.params.idComentario;
    let respuesta :IComentario = req.body;

    comentarioModel.findByIdAndUpdate(idComentario, {$set: respuesta}).then((commentAnswered: IComentario | null) =>{
        if(!commentAnswered){
            return res.json({
                mensaje:"Respuesta no enviada",

            })
        }
        return res.status(200).json({
            mensaje:"Comentario enviado"
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:err
        })
    })
})

//Obtener todos los comentarios por id

app.get('/clientes/:idCliente/comentarios/', (req:Request, res: Response) =>{
    let idCliente:string = req.params.idCliente

    comentarioModel.find({blnStatus:true, idCliente:idCliente}).select('idCliente dteFechaComentario strComentario blnStatus').then((comentariosCliente: IComentario[]) =>{
        if(comentariosCliente.length===0){
            return res.json({
                mensaje: "No hay comentarios",
                contenido:{
                    comentariosCliente
                }
            })
        }
    return res.status(200).json({
        mensaje:"Comentarios encontrados",
        contenido:{
            comentariosCliente
        }
    })
    }).catch((err:any) =>{
        res.status(500).json({
            mensaje: "Error del servidor",
            contenido:{       
                err      
            }
        })
    })
})
*/
export {app};
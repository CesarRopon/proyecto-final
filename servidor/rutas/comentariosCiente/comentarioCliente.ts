import {Router, Request, Response} from 'express';
import comentarioModel, {IComentario} from '../../modelos/comentario.model';
import clienteModel, {ICliente} from '../../modelos/cliente.model';
import { model } from 'mongoose';


const app : Router = Router();

//Traer todos los comentarios
app.get('/comentarios', (req:Request, res:Response) =>{

    
    comentarioModel.find({blnStatus:false}).then((comentarios: IComentario[]) =>{
    if(comentarios.length===0){
        return res.json({
            mensaje: "No hay comentarios",
            comentarios
        })
    }
        return res.status(202).json({
        mensaje:"Comentarios encontrados",
        comentarios
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"No encontrados",
            err
        })
    } )
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
})

//Nuevo comentario 
app.post('/comentarios',(req:Request, res:Response) =>{

    let newComment :IComentario = req.body;
    

    new comentarioModel(newComment).save().then((nuevoComm:IComentario| null ) =>{
        if(!nuevoComm){
            return res.json({
                mensaje: "no enviado",
                nuevoComm
            })
        }

        return res.json({
            mensaje: "enviado",
            nuevoComm
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje: err
        })
    })

})



//Obtener comentarios por  fecha
app.get('/clientes/:idCliente/comentarios/:dteFecha', (req:Request, res:Response) =>{
    let idCliente: string = req.params.idCliente;
    let fecha: string = req.params.dteFecha;

    
    comentarioModel.find({idCliente:idCliente, dteFechaComentario:fecha}).then((comentariosCliente: IComentario[]) =>{
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

export {app};
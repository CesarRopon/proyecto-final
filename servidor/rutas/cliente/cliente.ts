import {Router, Request, Response} from "express";
import clienteModel, {ICliente} from '../../modelos/cliente.model';
import { verificaToken } from "../../middlewares/verificarToken";

const app :Router = Router();

//Obtener General
app.get ('/clientes',  verificaToken, (req:Request, res: Response) =>{

    clienteModel.find({blnActivo:true}).then((cliente:ICliente[]) =>{
        if(cliente.length ===0){
            return res.json({
                mensaje:"No se encontraron clientes",
                contenido: cliente
            })
        }
        return res.status(200).json({
            mensaje:"Datos encontrados",
            contenido: cliente
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            msg: "Error al consultar datos del cliente",
            contenido:err
        });
    })
})

//Obtener Especifico
app.get('/clientes/:idCliente',  (req: Request, res: Response)=>{
    let idCliente: string = req.params.idCliente;
    clienteModel.findById(idCliente).then((cliente:ICliente | null) =>{
        if(!cliente){
            res.status(404).json({
             mensaje: "No se encontro el cliente",
            contenido: cliente
            })
        }   

        return res.status(200).json({
            mensaje: "El cliente se encontro satisfactoriamente",
            contenido:cliente
        })

    }).catch((err:any) =>{
        return res.status(500).json({
            mensaje:"Ha habido un error",
            contenido:err
        })
    })
})

//Agregar 
app.post('/clientes', (req:Request, res:Response) => {

    let cliente : ICliente = req.body;
    new clienteModel(cliente).save().then((cliente: ICliente) =>{
        if(!cliente){
            return res.status(404).json({
                mensaje:"Error",
                contenido:cliente
            })
        }
        return res.status(202).json({
            mensaje:"Se registro el cliente exitosamente",
            contenido:cliente
        })
    }).catch((err: any)=>{
        return res.status(500).json({
            mensaje:"Ha ocurrido un error al registrar el cliente",
            contenido:err
        })
    });
})

//Eliminar
app.delete('/clientes/:idCliente', (req:Request,res:Response ) =>{
    let idCliente: string = req.params.idCliente;

    clienteModel.findByIdAndRemove(idCliente).then((cliente: ICliente |null ) =>{
        if(!cliente){
           return  res.status(404).json({
               mensaje:"No se encontro el cliente a eliminar",
               contenido :cliente
           })
        }
        return res.status(200).json({
            msg:"Se elimino al cliente",
            contenido:cliente
        })
    }).catch((err:any) =>{
        return res.json(500).json({
            msg: "Ocurrio un error",
            contenido:err
        })
    })
})

//Actualizar
app.put('/clientes/:idCliente', (req:Request, res:Response) =>{

    let idCliente: string  = req.params.idCliente;

    let cliente: ICliente = new clienteModel(req.body);
    cliente._id = idCliente;

    clienteModel.findByIdAndUpdate(idCliente,{ $set: cliente }).then((clienteRes:ICliente | null) =>{
        if(!clienteRes){
            return res.status(404).json({
                mensaje:"No se encontro el cliente",
                contenido:clienteRes
            })
        }

        return res.status(200).json({
            mensaje:"Se actualizo satisfactoriamente",
            contenido:clienteRes
        })

    }).catch((err:any ) =>{
        res.status(500).json({
            mensaje:"Hubo un error",
            contenido:err
        })
    })
})

export {app}

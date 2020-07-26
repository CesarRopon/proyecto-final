import {Router, Request, Response} from "express";
import clienteModel, {ICliente} from '../../modelos/cliente.model';

const app :Router = Router();

//Obtener General
app.get ('/clientes',  (req:Request, res: Response) =>{

    clienteModel.find({blnActivo:true}).then((cliente:ICliente[]) =>{
        if(cliente.length ===0){
            return res.json({
                mensaje:"No se encontraron clientes",
                cliente
            })
        }
        return res.status(200).json({
            mensaje:"Datos encontrados",
            cliente
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            msg: "Error al consultar datos del cliente",
            cont:{
                err
            }
        });
    })
})

//Obtener Especifico
app.get('/clientes/:idCliente',  (req: Request, res: Response)=>{
    let idCliente: string = req.params.idCliente;
    clienteModel.findById(idCliente).then((cliente:ICliente | null) =>{
        if(!cliente){
            res.status(404).json({
             msg: "No se encontro el cliente",
            cliente
            })
        }   

        return res.status(200).json({
            msg: "El cliente se encontro satisfactoriamente",
            cliente
        })

    }).catch((err:any) =>{
        return res.status(500).json({
            msg:"Ha habido un error",
            cont:{
             err                
            }
        })
    })
})

//Agregar 
app.post('/clientes', (req:Request, res:Response) => {

    let cliente : ICliente = req.body;
    new clienteModel(cliente).save().then((cliente: ICliente) =>{
        if(!cliente){
            return res.status(404).json({
                msg:"Error",
                cont:{
                    cliente
                }
            })
        }
        return res.status(202).json({
            msg:"Se registro el cliente exitosamente",
            contenido:{
                cliente
            }
        })
    }).catch((err: any)=>{
        return res.status(500).json({
            msg:"Ha ocurrido un error al registrar el cliente",
            contenido:{
                err
            }
        })
    });
})

//Eliminar
app.delete('/clientes/:idCliente', (req:Request,res:Response ) =>{
    let idCliente: string = req.params.idCliente;

    clienteModel.findByIdAndRemove(idCliente).then((cliente: ICliente |null ) =>{
        if(!cliente){
           return  res.status(404).json({
               msg:"No se encontro el cliente a eliminar",
               cont :{
                   cliente
               }
           })
        }
        return res.status(200).json({
            msg:"Se elimino al cliente",
            cont:{
                cliente
            }
        })
    }).catch((err:any) =>{
        return res.json(500).json({
            msg: "Ocurrio un error",
            cont:{
                err
            }
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
                msg:"No se encontro el cliente",
                cont:{
                    clienteRes
                }
            })
        }

        return res.status(200).json({
            msg:"Se actualizo satisfactoriamente",
            cont:{
                clienteRes
            }
        })

    }).catch((err:any ) =>{
        res.status(500).json({
            msg:"Hubo un error",
            cont:{
                err
            }
        })
    })
})


export {app}

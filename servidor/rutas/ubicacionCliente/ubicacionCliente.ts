import {Request, Response, Router} from 'express';
import UbicacionModel, {IUbicacion} from '../../modelos/ubicacionCliente.model';
import ClienteModel, {ICliente} from '../../modelos/cliente.model';


const app: Router = Router();

app.get('/clientes/:idCliente/ubicaciones', (req:Request, res:Response) =>{

    let idCliente: string= req.params.idCliente;
    if(idCliente.length<24){
        return res.status(404).json({
            mensaje:"[ID invalido]",
            contenido:"El id del cliente es invalido"
        })
    }

    UbicacionModel.find({idCliente:idCliente}).then((ubicaciones:IUbicacion[]) =>{
        if(ubicaciones.length==0){
            return res.json({
                mensaje:"Error",
                contenido:"No hay ubicaciones"
            })
        }

        return res.status(200).json({
            mensaje:"Pedidos encontrados",
            contenido: ubicaciones
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"Error interno",
            contenido: err
        })
    })

})


app.get('/clientes/:idCliente/ubicaciones/:idUbicacion', (req:Request, res:Response) =>{


    let idCliente:string  = req.params.idCliente;
    let idUbicacion : string= req.params.idUbicacion;
    
    if(idCliente.length<24 || idCliente.length>24){
        return res.status(404).json({
            mensaje:"[ID invalido]",
            contenido:"El id del cliente es invalido"
        })
    }else if(idUbicacion.length<24 || idUbicacion.length>24){
        return res.status(404).json({
            mensaje:"[ID invalido]",
            contenido: "El id de la ubicacion es invalido"
        })
    }

    UbicacionModel.find({_id: idUbicacion, idCliente: idCliente}).then((ubicacion: IUbicacion[]) =>{
        if(ubicacion.length==0){
            return res.status(404).json({
                mensaje:"Vacio",
                contenido: "No existe esa ubicacion"
            })        
        }

        return res.status(202).json({
            mensaje:"Ubicacion",
            contenido: ubicacion
        })

    }).catch((err: any ) =>{
        return res.json({
            mensaje: "Error interno",
            contenido:err
        })
    })

} )


app.post('/clientes/:idClientes/ubicaciones', (req: Request, res: Response) =>{

    let newUbicacion: IUbicacion = req.body;
    let idCliente: string = req.params.idCliente;

    new UbicacionModel(newUbicacion).save().then((ubicacion:IUbicacion) =>{
        if(!ubicacion){
            return res.status(404).json({
                mensaje:"[Insercion error]",
                contenido : "Error de insercion"
            })
        }

        return res.status(200).json({
            mensaje: "Insercion exitosa",
            contenido: ubicacion
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje: "[Error interno]",
            contenido: err
        })
    })
})



app.put('/clientes/:idCliente/ubicaciones/:idUbicacion', (req:Request, res:Response) =>{

    let ubicacionUpdated:IUbicacion = req.body;
    let idUbicacion:string = req.params.idUbicacion;

    if(idUbicacion.length<23){
        return res.json({
            mensaje: "Id error",
            contenido: "El id de la ubicacion debe contener 24 caracteres"
        })
    }


    UbicacionModel.findByIdAndUpdate(idUbicacion, {$set :ubicacionUpdated}).then((ubicacion: IUbicacion | null) =>{
        if(!ubicacion){
            return res.status(404).json({
                mensaje:"No actualizado",
                contenido: "No se pudo actualizar la ubicacion"
            })
        }

        return res.status(200).json({
            mensaje: "Actualizado",
            contenido: "Se actualizo correctamente"
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje: "Error interno",
            contenido: err
        })
    })
})


app.delete('/clientes/:idCliente/ubicaciones/:idUbicacion', (req: Request, res: Response) =>{

    let idCliente: string = req.params.idCliente;
    let idUbicacion: string = req.params.idUbicacion;

    
    if(idCliente.length <24 || idCliente.length>24){
        return res.status(404).json({
            mensaje: "Error id",
            contenido: "El id de cliente no es invalido"
        })
    }else if(idUbicacion.length<24 || idUbicacion.length>24){
        return res.status(404).json({
            mensaje: "Error id",
            contenido: "El id de Ubicacion no es invalido"
        })
    }
    UbicacionModel.findOneAndDelete({_id:idUbicacion, idCliente: idCliente}).then((ubicacion: IUbicacion | null) =>{
        if(!ubicacion){
            return res.json({
                mensaje: "Error de eliminacion",
                contenido: "No pudo eliminarse, intenta de nuevo"
            })
        }

        return res.status(200).json({
            mensaje:"Eliminado",
            contenido: "ubicacion eliminada"
        })
    }).catch((err: any)  =>{
        return res.json({
            mensaje:"Error interno",
            contenido: err      
          })
    })
})
export {app};

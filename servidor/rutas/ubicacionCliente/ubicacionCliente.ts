import {Request, Response, Router} from 'express';
import UbicacionModel, {IUbicacion} from '../../modelos/ubicacionCliente.model';
import ClienteModel, {ICliente} from '../../modelos/cliente.model';


const app: Router = Router();


app.post('/clientes/:idCliente/ubicaciones', (req:Request, res:Response) =>{

    let idCliente: string = req.params.idCliente;

    let ubicacion: IUbicacion = req.body;

    ClienteModel.findByIdAndUpdate(idCliente, {$push: {aJsnUbicacion: ubicacion} }).then((cliente: ICliente | null)=>{
        if(!cliente){
            return res.status(404).json({
                msg:"La persona a la que desea agregar ubicacion nose encuentra.",
                cont:{
                    cliente
                }
            })
        }
        return res.status(500).json({
            msg:"Ubicacion agregada",
            cont:{
                cliente
            }
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            msg: `Error interno: ${err}`
        })
    })
})

export {app};

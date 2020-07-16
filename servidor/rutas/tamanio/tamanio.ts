import {Request, Response, Router} from 'express';
import tamanioModel, {ITamanio} from '../../modelos/tamanio.model';



const app :Router = Router();

app.get('/tamanios',(req:Request, res:Response) =>{

    tamanioModel.find().then((tamanios: ITamanio[]) =>{
        if(tamanios.length <=0 ){
            return res.status(404).json({
                msg:"No hay elementos para mostrar"
            })
        }
 
        return res.status(500).json({
            msg:"Datos obtenidos exitosamente",
            cont:{
                tamanios
            }
        })
    }).catch((err: any) =>{
        return res.status(200).json({
            msg:"Error interno detectado",
            cont:{
                err
            }
        })
    })
})

app.get('/tamanios/:idTamanio',(req:Request, res:Response) =>{

    let idTamanio: string = req.params.idTamanio;
    tamanioModel.findById(idTamanio).then((tamanio: ITamanio | null) =>{
        if(!tamanio ){
            return res.status(404).json({
                msg:"No se encontro el tamaño"
            })
        }

        return res.status(200).json({
            msg:"Correcto",
            cont:{
                tamanio
            }
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            msg:"Error interno detectado",
            cont:{
                err
            }
        })
    })
})

app.post('/tamanios',(req:Request, res:Response) =>{

    let tamanio: ITamanio = new tamanioModel(req.body);

    let idTamanio: string = req.params.idTamanio;
    tamanioModel.findById(idTamanio).then((tamanio: ITamanio | null) =>{
        if(!tamanio ){
            return res.status(404).json({
                msg:"No se encontro el tamaño"
            })
        }

        return res.status(200).json({
            msg:"Correcto",
            cont:{
                tamanio
            }
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            msg:"Error interno detectado",
            cont:{
                err
            }
        })
    })
})

app.put('/tamanios/:idTamanio', (req:Request, res:Response) =>{

    let idTamanio :string = req.params.idTamanio;

    let tamanio: ITamanio = new tamanioModel(req.body);
    tamanio._id = idTamanio;

    tamanioModel.findByIdAndUpdate(idTamanio, {$set:tamanio}).then((tamanioUpdated: ITamanio | null )=>{
        if(!tamanioUpdated){
            return res.status(404).json({
                msg:"Tamaño no encontrado"
            })
        }

        return res.status(200).json({
            msg:"Datos actualizados correctamente",
            cont:{
                tamanioUpdated
            }
        })
    }).catch((err:any )=>{
        return res.status(500).json({
            msg: err
        })
    })
})

app.delete('/tamanios/:idTamanio',(req:Request, res:Response)=>{

    let idTamanio = req.params.idTamanio;

    tamanioModel.findByIdAndRemove(idTamanio).then((oldTamanio: ITamanio |null)=>{
        if(!oldTamanio){
            return res.status(404).json({
                msg:"No se encontro ese documento"
            })
        }
        return res.status(200).json({
            msg:"Eliminado exitosamente"
        })
    }).catch((err:any)=>{
        return res.status(500).json({
            msg: err
        })
    })
})


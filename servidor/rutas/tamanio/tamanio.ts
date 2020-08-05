import {Request, Response, Router} from 'express';
import tamanioModel, {ITamanio} from '../../modelos/tamanio.model';



const app :Router = Router();

app.get('/tamanios',(req:Request, res:Response) =>{

    tamanioModel.find().then((tamanios: ITamanio[]) =>{
        if(tamanios.length <=0 ){
            return res.status(404).json({
                mensaje:"sin elementos",
                contenido: "No hay elementos para mostrar" 
            })
        }
 
        return res.status(500).json({
            mensaje:"Datos obtenidos exitosamente",
            contenido:tamanios
        })
    }).catch((err: any) =>{
        return res.status(200).json({
            mensaje:"Error interno detectado",
            contenido:err
        })
    })
})

app.get('/tamanios/:idTamanio',(req:Request, res:Response) =>{

    let idTamanio: string = req.params.idTamanio;

    if(idTamanio.length<24 || idTamanio.length>24){
        return res.json({
            mensaje:"Error de id",
            contenido:"No es el formato correcto para id"
        })
    }
    tamanioModel.findById(idTamanio).then((tamanio: ITamanio | null) =>{
        if(!tamanio){
            return res.status(404).json({
                mensaje:"Sin tamaño",
                contenido: "No se encontro el tamaño"
            })
        }

        return res.status(200).json({
            mensaje:"Correcto",
            contenido: tamanio
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            mensaje:"Error interno detectado",
            contenido: err
        })
    })
})

app.post('/tamanios',(req:Request, res:Response) =>{

    let newTamanio: ITamanio = new tamanioModel(req.body);

    let idTamanio: string = req.params.idTamanio;
    new  tamanioModel(newTamanio).save().then((tamanio: ITamanio | null) =>{
        if(!tamanio ){
            return res.status(404).json({
                mensaje:"No agregado",
                contenido: "Tamaño no agregado"
            })
        }
        let {strDescripcion}= newTamanio
        return res.status(200).json({
            mensaje:"Dado de alta",
            contenido : `${strDescripcion} dado de alta`
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            mensaje:"Error interno detectado",
            contenido:err
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
                mensaje:"Tamanio no encontrado",
                contenido: "No se pudo actualizar"
            })
        }

        return res.status(200).json({
            mensaje:"Encontrado",
            contenido: "Se actualizo correctamente"
        })
    }).catch((err:any )=>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido: err
        })
    })
})

app.delete('/tamanios/:idTamanio',(req:Request, res:Response)=>{

    let idTamanio = req.params.idTamanio;

    tamanioModel.findByIdAndRemove(idTamanio).then((oldTamanio: ITamanio |null)=>{
        if(!oldTamanio){
            return res.status(404).json({
                mensaje:"No encontrado",
                contenido:"No se pudo eliminar"
            })
        }
        return res.status(200).json({
            mensaje:"Correcto",
            contenido: "Eliminado exitosamente"
        })
    }).catch((err:any)=>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido: err
        })
    })
})

export {app}


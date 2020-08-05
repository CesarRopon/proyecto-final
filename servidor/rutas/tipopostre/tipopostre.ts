import {Router, Request, Response, response} from 'express';
import tipoPostreModel,{ITipoPostre} from '../../modelos/tipoPostre.model';
import { model } from 'mongoose';


const app: Router = Router();

app.get('/tipospostre', (req:Request, res:Response) =>{

    tipoPostreModel.find({blnActivo:true}).then((tipos: ITipoPostre[]) =>{
        if(tipos.length===0){
             return res.json({
                 mensaje:"Tipos no encontrados",
                 contenido:{
                     tipos
                 }
             })   
        }
        return res.status(202).json({
            mensaje:"Tipos encontrados",
            contenido:{
                tipos
            }
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contendio:{
                err
            }
        })
    })
})

app.get('/tipospostre/:idTipo', (req:Request, res:Response ) =>{

    let idTipo :string = req.params.idTipo;

    tipoPostreModel.findById(idTipo).then(( tipo: ITipoPostre | null) =>{
        if(!tipo){
            return res.json({
                mensaje: "No se encontro el tipo",
                contenido:{
                    tipo
                }
            })
        }
        return res.status(200).json({
            mensaje:"Encontrado",
            contenido:tipo
        })
    })
})

app.put('/tipospostre/:idTipo', (req: Request, res: Response) =>{
    let idTipo :string = req.params.idTipo;
    let typeUdated: ITipoPostre = req.body;
    
    tipoPostreModel.findByIdAndUpdate(idTipo, {$set: typeUdated}).then((tipo: ITipoPostre | null) =>{
        if(!tipo){
            return res.status(404).json({
                mensaje:"No encontrado",
                contenido:tipo
            })
        }
        return res.status(200).json({
            mensaje:"Documento actualizado",
            contenido:tipo
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido:err
        })
    })

})

app.post('/tipospostre', (req:Request, res: Response) =>{

    let newTipo: ITipoPostre = req.body;

    new tipoPostreModel(newTipo).save().then((tipo:ITipoPostre) =>{
        if(!tipo){
            return res.json({
                mensaje:"No agregado"
            })
        }
        return res.status(202).json({
            mensaje:"Agregado exitosamente",
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"Error interno"
        })
    })
})

app.delete('/tipospostre/:idTipo', (req: Request, res: Response) =>{
    let idTipo :string = req.params.idTipo;
    tipoPostreModel.findByIdAndRemove(idTipo).then((tipos: ITipoPostre | null) =>{
        if(!tipos){
            return res.status(404).json({
                mensaje:"No eliminado",
                contenido:tipos
            })
        }
        return res.status(200).json({
            mensaje:"Dado de baja",
            contenido:tipos
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido:err
        })
    })
})

export {app}
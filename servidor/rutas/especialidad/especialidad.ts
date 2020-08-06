import {Router, Request, Response} from 'express';
import especialidadModel, {IEspecialidad} from '../../modelos/especialidad.model';


const app :Router = Router();

app.get('/especialidades', (req:Request, res: Response) =>{


    especialidadModel.find().then((especialidades: IEspecialidad[]) =>{
        if(especialidades.length==0){
            return res.json({
                mensaje: "No hay especialidades",
                contenido: "No hay especialidades registradas"
            })
        }
        return res.status(200).json({
            mensaje:"Especialidades",
            contenido: especialidades
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje:"Error interno",
            contenido: err
        })
    })
})


app.get('/especialidades/:idEspecialidad', (req:Request, res: Response) =>{
    let idEspecialidad : string = req.params.idEspecialidad;

    if(idEspecialidad.length<24){
        return res.json({
            mensaje:"Error de id",
            contenido: "El id de la especialidad"
        })
    }
    especialidadModel.findById(idEspecialidad).then((especialidad: IEspecialidad | null) =>{
        if(!especialidad){
            return res.status(404).json({
                mensaje: "Error",
                contenido: "No existe esa especialidad"
            })
        }

        return res.status(202).json({
            mensaje:"Encontrado",
            contenido: especialidad
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido:err
        })
    })
})


app.post('/especialidades', (req:Request, res:Response) =>{
    
    let newEspecialidad: IEspecialidad = req.body;

    new especialidadModel(newEspecialidad).save().then((newEspec : IEspecialidad) =>{
        if(!newEspec){
            return res.status(4040).json({
                mensaje:"Error de insercion",
                contenido: "No se pudo dar de alta la especialidad"
            })
        }
        return res.status(202).json({
            mensaje:"Insertado",
            contenido: newEspec
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje:"Error interno",
            contenido:err
        })
    })
})


app.put('/especialidades/:idEspecialidad', (req:Request, res:Response) =>{

    let idEspecialidad : string = req.params.idEspecialidad;
    
    let especUpdated : IEspecialidad = req.body;
    console.log(idEspecialidad);
    
    console.log(especUpdated)
    if(idEspecialidad.length<24){
        return res.json({
            mensaje:"Error de id",
            contenido: "Este id no es valido para id especialidad"
        })
    }

    especialidadModel.findByIdAndUpdate(idEspecialidad, {$set: especUpdated}).then((especialidad: IEspecialidad | null) =>{
        if(!especialidad){
            
            return res.status(404).json({
                mensaje:"Error de actualizacion",
                contenido: `No se pudo hacer la actualizacion`
            })
            
        }
        let {strDescripcion} = especialidad;
        return res.status(200).json({
            mensaje:`Actualizado` ,
            contenido: `Se actualizo la especialidad ${strDescripcion}`
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido: err
        })
    })
})

app.delete('/especialidades/:idEspecialidad', (req:Request, res:Response) =>{
    
    let idEspecialidad : string = req.params.idEspecialidad;
    if(idEspecialidad.length<24){
        return res.json({
            mensaje: "Error de id",
            contenido: "Este id para especialidad no es valido"
        })
    }

    especialidadModel.findByIdAndDelete(idEspecialidad).then((oldEspec: IEspecialidad | null) =>{
        if(!oldEspec){
            return res.status(404).json({
                mensaje:"No eliminado",
                contenido:"No se pudo eliminar esta especialidad"
            })
        }

        return res.status(200).json({
            mensaje:"Correcto",
            contenido: "Se elimino esta especialidad"
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido: err
        })
    })
})



export {app}


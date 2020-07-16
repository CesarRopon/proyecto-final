//Importaciones necesarias
import express,{Router, Request,Response, response} from 'express';
import AdminModel, {IAdmin} from '../../modelos/admin.model';

//declaraciones
const  app: Router = Router();


//
app.get('/admin', (req:Request, res:Response) =>{

})


app.post('/admin', (req: Request, res:Response) =>{

    let admin : IAdmin = req.body;
    new AdminModel(admin).save().then((administrador: IAdmin)=>{
        if(!administrador){
            return res.status(404).json({
                msg:"0",
                err:"Ha ocurrido un error, intentalo de nuevo"
            })
        }
        return res.status(200).json({
            msg:"Administrador dado de alta",
            cont:{
                administrador
            }
        })
    }).catch((err:any) =>{
        return res.json({      
            msg:"0",
            err:"Te han faltado campos por llenar"
        })
    })
})

app.put('/admin/:idAdmin', (req: Request, res: Response) =>{
    let idAdmin: string = req.params.idAdmin;

    let admin: IAdmin = new AdminModel(req.body);
    admin._id = idAdmin;

    AdminModel.findByIdAndUpdate(idAdmin, {$set: admin}).then((newPersona: IAdmin | null) =>{
        if(!newPersona){
            return res.status(404).json({
                msg:"No se encontro el id"+ idAdmin
            })
        }
        let{strNombre, strApellidos} = newPersona;
        return res.status(200).json({
            msg: `se actualizo corectamente el usuario ${strNombre} ${strApellidos}`,
            cont:{
                newPersona
            }
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            msg:"Algo salio mal",
            cont:{
                err
            }
        })
    })
})
/*
metodo post para autenticacion de admin
app.post('/admin/login',(req:Request, res:Response) =>{

})
*/

export {app}
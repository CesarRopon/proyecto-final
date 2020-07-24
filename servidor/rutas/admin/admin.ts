//Importaciones necesarias
import express,{Router, Request,Response, response} from 'express';
import AdminModel, {IAdmin} from '../../modelos/admin.model';

//declaraciones
const  app: Router = Router();


//

app.get('/admin', (req:Request, res:Response) =>{

    AdminModel.find().then((persona: IAdmin[]) =>{
        return res.status(200).json({
            mensaje: "Todo bien, todo correcto",
            contenido:{
                persona
            }
        })
    }).catch((err: any)=>{
        return res.status(500).json({
            mensaje: err
        })
    })

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

    let admin: IAdmin = req.body;
    admin._id = idAdmin;

    AdminModel.findByIdAndUpdate(idAdmin, {$set: admin}).then((admin: IAdmin | null) =>{
        if(!admin){
            return res.status(404).json({
                mensaje:"No se encontro el id",
                contenido:{
                    admin
                }
            })
        }
        let{strNombre, strApellidos} = admin;
        return res.status(200).json({
            mensaje: `se actualizo corectamente el usuario ${strNombre} ${strApellidos}`,
            cont:{
                admin
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



//get especifico by email
app.get('/admin/:strEmail', (req:Request, res:Response) =>{

    let strEmail: string = req.params.strEmail;
    AdminModel.find({strEmail: strEmail}).then((persona: IAdmin[]) =>{
        if(persona.length>0){
        return res.status(200).json({
            mensaje: "Todo bien, todo correcto",
            contenido:{
                persona
            }
        })
    }
    return res.json({
        msg:"Usuario no encontrado"
    })
    }).catch((err: any)=>{
        return res.status(500).json({
            mensaje: err
        })
    })

})

app.get('/admins/:idAdmin', (req:Request, res:Response) =>{

    let idAdmin: string = req.params.idAdmin;
    AdminModel.findById(idAdmin).then((admin: IAdmin | null) =>{
        if(!admin){
        return res.json({
            mensaje: "No se encontro",
            contenido:{
                admin
            }
        })
    }
    return res.json({
        msg:"Usuario no encontrado",
        contenido: {
            admin
        }
    })
    }).catch((err: any)=>{
        return res.status(500).json({
            mensaje: 'Error interno',
            contenido:{
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
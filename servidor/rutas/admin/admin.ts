//Importaciones necesarias
import express,{Router, Request,Response, response} from 'express';
import AdminModel, {IAdmin} from '../../modelos/admin.model';
import adminModel from '../../modelos/admin.model';
import * as bcrypt from 'bcryptjs';

//declaraciones
const  app: Router = Router();


//

app.get('/admin',  (req:Request, res:Response) =>{

    AdminModel.find().then((admin: IAdmin[]) =>{
        if(admin.length==0){
            return res.status(404).json({
                mensaje:"no admins",
                contenido: "No hay administradores"
            })
        }
        return res.status(200).json({
            mensaje: "Todo bien, todo correcto",
            contenido:{
                admin
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
    //Encriptar contraseña
    admin.strPassword = bcrypt.hashSync(admin.strPassword, 10);
    new AdminModel(admin).save().then((administrador: IAdmin)=>{
        if(!administrador){
            return res.status(404).json({
                mensaje:"0",
                contenido:"Ha ocurrido un error, intentalo de nuevo"
            })
        }
        return res.status(200).json({
            mensaje:"Administrador dado de alta",
            contenido:administrador
        })
    }).catch((err:any) =>{
        return res.json({      
            mensaje:"0",
            contenido:"Te han faltado campos por llenar"
        })
    })
})

//
app.put('/admin/:idAdmin',  (req: Request, res: Response) =>{
    let idAdmin: string = req.params.idAdmin;
    let admin: IAdmin = req.body;
    admin._id = idAdmin;

    if(idAdmin.length<24 || idAdmin.length>24){
        return res.json({
            mensaje:"Error de id",
            contenido: "El id debe tener un fotmato valido"
        })
    }

    AdminModel.findByIdAndUpdate(idAdmin, {$set: admin}).then((admin: IAdmin | null) =>{
        if(!admin){
            return res.status(404).json({
                mensaje:"No se encontro el id",
                contenido:admin
            })
        }
        let{strNombre, strApellidos} = admin;
        return res.status(200).json({
            mensaje: `se actualizo corectamente el usuario ${strNombre} ${strApellidos}`,
            contenido:admin
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            mensaje:"Algo salio mal",
            contenido: err
        })
    })
})



//get especifico by email
app.get('/admin/:strEmail', (req:Request, res:Response) =>{

    let strEmail: string = req.params.strEmail;
    AdminModel.find({strEmail: strEmail}).then((admin: IAdmin[]) =>{
        if(admin.length>0){
        return res.status(200).json({
            mensaje: "Persona encontrada",
            contenido:admin
        })
    }
    return res.status(404).json({
        mensaje:"Usuario no encontrado",
        contenido: "Prueba con otro usuario"
    })
    }).catch((err: any)=>{
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        })
    })

})

//Obtener admin byid
app.get('/admins/:idAdmin',(req:Request, res:Response) =>{

    let idAdmin: string = req.params.idAdmin;
    AdminModel.findById(idAdmin).then((admin: IAdmin | null) =>{
        if(!admin){
        return res.status(404).json({
            mensaje: "No se encontro",
            contenido:admin
        })
    }
    return res.status(200).json({
        msg:"Usuario encontrado",
        contenido: admin
    })
    }).catch((err: any)=>{
        return res.status(500).json({
            mensaje: 'Error interno',
            contenido:err
        })
    })

})

//Borrar administrador
app.delete('/admins/:idAdmin', (req: Request, res:Response) =>{

    let idAdmin:string = req.params.idAdmin;
    if(idAdmin.length<24 || idAdmin.length>24){
        return res.status(404).json({
            mensaje:"Error de id",
            contenido: "Este id debe tener un formato valido"
        })
    }

    adminModel.findByIdAndRemove(idAdmin).then((admin: IAdmin | null) =>{
        if(!admin){
            return res.status(404).json({
                mensaje: "Error en la eliminacion",
                contenido:"No se pudo eliminar"
            })
        }

        return res.status(200).json({
            mensaje:"Eliminado",
            contenido: admin
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido: err
        })
    })
})

//metodo post para autenticacion de admin
app.post('/admin/login',(req:Request, res:Response) =>{
    let {strEmail, strPassword} = req.body;
    
    adminModel.findOne({strEmail : strEmail}).then((admin: IAdmin| null) =>{
        if(!admin){
            return res.status(404).json({
                mensaje:"Correo incorrecto",
                contenido:admin            })
        }

        bcrypt.compare(strPassword,admin.strPassword).then(async(resp:any) =>{
            if(!resp){
                return res.json({
                    mensaje:"Contraseña incorrecta",
                    contenido: resp
                })
            }

            let {strNombre, strApellidos} = admin
            return res.status(200).json({
                mensaje:`Bienvenido al sistema ${strNombre} ${strApellidos}`,
                contenido: admin
            })
        }).catch((err: any) =>{
            return res.json({
                mensaje:"Error al ingresar",
                contenido: err
            })
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"Error al ingresar",
            contenido: err
        })
    })
})

//cambiar contraseña
app.put('/admins/changePass/:strEmail', (req:Request, res:Response) =>{

    let emailAdmin :string = req.params.strEmail;    
    let newPass = req.body.strPassword;

    console.log(newPass+" "+ emailAdmin);

    
    adminModel.findOne({strEmail: emailAdmin}).then((admin : IAdmin | null) =>{
        if(!admin){
            return res.status(404).json({
                mensaje:"No existe el correo"
            })
        }

            newPass = bcrypt.hashSync(newPass, 10);
            adminModel.findByIdAndUpdate(admin._id, {strPassword:newPass}).then((passChanged: IAdmin | null) =>{
                if(!passChanged){
                    return res.json({
                        mensaje:"No se pudo cambiar la contraseña"
                    })
                }
                return res.status(200).json({
                    mensaje:"Contraseña actualizada"
                })
            }).catch(() =>{
                return res.json({
                    mensaje:"Error interno"
                })
            })
        }).catch((err:any) =>{
           return res.status(500).json({
               mensaje:"Error interno"
           }) 
        })
})

export {app}
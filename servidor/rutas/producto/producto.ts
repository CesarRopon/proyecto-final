import {Router, Request, Response} from 'express';
import productoModel, {IProducto} from '../../modelos/producto.model';
import {UploadedFile} from 'express-fileupload';
import {FileUpload} from '../../librerias/fileUpload';


const app :Router = Router();

app.get('/productos', (req:Request, res:Response) =>{

    productoModel.find({blnActivo:true}).then((producto: IProducto[]) =>{
        if(producto.length===0){
           return res.json({
               msg:"No hay",
               contenido:{
                   producto
               }
           })     
        }
        return res.status(200).json({
            msg:"Datos encontrados",
            contenido:{
                producto
            }
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            msg:"Error interno",
            contenido: {
                err
            }
        })
    })
})

app.get('/productos/:idProducto', (req:Request, res:Response) =>{

    let idProducto :string = req.params.idProducto;
    productoModel.find({'_id': idProducto}).then((producto: IProducto[]) =>{
        if(producto.length<=0){
           return res.status(404).json({
               msg:"No hay productos",
               contenido:{
                   producto
               }
           })     
        }
        return res.status(200).json({
            msg:"Datos encontrados",
            contenido:{
                producto
            }
        })
    }).catch((producto: any) =>{
        return res.status(500).json({
            msg:"Error interno",
            contenido: {
                producto
            }
        })
    })
})

app.post('/productos', (req:Request, res:Response) =>{

    let newProd :IProducto = req.body;
    let fileUpload = new FileUpload('imgProductos', ['image/jpeg', 'image/png']);
    let nombreImg:string;
    
    if(req.files){
        let file = req.files.strImg as UploadedFile;
        try {
            nombreImg =fileUpload.subirArchivo(file);
            console.log(nombreImg);
            
            newProd.strImg = nombreImg;
            newProd.strImg = nombreImg;
        } catch (error) {
            console.log(error.toString());
            
        }
 
    
    }
    new productoModel(newProd).save().then((producto: IProducto) =>{
        if(!producto){
            return res.status(404).json({
                msg:"Intentalo de nuevo",
                contenido:{
                    producto
                }
            })     
         }
         return res.status(200).json({
             msg:"Datos encontrados",
             contenido:{
                 producto
             }
         })
    }).catch((err: any) =>{
        fileUpload.eliminarArchivo(nombreImg);
        return res.status(500).json({
            msg:"Error interno",
            contenido:{
                err
            }
        })
    })
})

app.post('/productos/:idProducto', (req:Request, res:Response) =>{

    let idProducto :string = req.params.idProducto;
    let productUpdated :IProducto = req.body;
    productoModel.findByIdAndUpdate(idProducto, {$set: productUpdated}).then((producto: IProducto | null) =>{
        if(!producto){
            return res.status(404).json({
                msg:"Intentalo de nuevo",
                contenido:{
                    producto
                }
            })     
         }
         return res.status(200).json({
             msg:"Producto",
             contenido:{
                 producto
             }
         })
    }).catch((err: any) =>{
        return res.status(500).json({
            msg:"Error interno",
            contenido:{
                err
            }
        })
    })
})


app.delete('/productos/:idProducto', (req:Request, res:Response) =>{

    let idProducto :string = req.params.idProducto;
    productoModel.findByIdAndUpdate(idProducto,{blnActivo:false}).then((producto: IProducto| null) =>{
        if(!producto){
            return res.status(404).json({
                msg:"Intentalo de nuevo",
                contenido:{
                    producto
                }
            })     
         }
         return res.status(200).json({
             msg:"Dado de baja",
             contenido:{
                 producto
             }
         })
    }).catch((producto: any) =>{
        return res.status(500).json({
            msg:"Error interno",
            contenido:{
                producto
            }
        })
    })
})


export {app}
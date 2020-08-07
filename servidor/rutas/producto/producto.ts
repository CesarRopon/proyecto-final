import {Router, Request, Response} from 'express';
import productoModel, {IProducto} from '../../modelos/producto.model';
import fileUpload, {UploadedFile} from 'express-fileupload';
import {FileUpload} from '../../librerias/fileUpload';
import multer from '../../libs/multer';
import { json } from 'body-parser';
//import {upload} from '../../servidor';

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

app.post('/productos',(req:Request, res:Response, next) =>{

    /*upload.single('strImg')(req, res, function(error: any){
        if(error){
            console.log('No jale ue');
            
        }else{
            console.log("NO mms");
        }
        
    })*/
    let newProducto : IProducto = req.body;

    new productoModel(newProducto).save().then((producto: IProducto) => {
        if(!producto){
            return res.status(404).json({
               mensaje: "Error de insercion",
               contenido: "No se pudo insertar" 
            })
        }

        let{strNombre, nmbCosto} = newProducto
        return res.status(200).json({
            mensaje: `${strNombre} con precio $${nmbCosto} se dio de alta`,
            contenido: producto
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido: err
        })
    })

    /*
    let nProd :IProducto = req.body;
    let fileUpload = new FileUpload('imgProductos', ['image/jpeg', 'image/png']);
   if(req.files){
       let file = req.files.strImg as UploadedFile
       let nombreImg = fileUpload.subirArchivo(file);
       nProd.strImg = nombreImg;
       console.log("Api post productos");
       console.log(nProd);
       return res.json({
        mensaje: "ya jala esta mamada"
    })
   }else{
    return res.json({
        mensaje:"No mames"
    })

   }*/


   
    

    //let newProd: IProducto = req.body;
    //newProd.strNombre = req.body.strNombre;
    //newProd.strDescripcion = req.body.strDescripcion;
    //newProd.nmbCosto =  req.body.nmbCosto;
    //newProd.strImg = req.file.filename;
/*
    new productoModel(newProd).save().then((producto: IProducto) =>{
        if(!producto){
            console.log('Errosito');
            
            return res.status(404).json({
                msg:"Intentalo de nuevo",
                contenido:{
                    producto
                }
            })     
         }
         console.log('Todo bien');
         return res.status(200).json({
             msg:"Datos encontrados",
             contenido:{
                 producto
             }
         })
    }).catch((err: any) =>{
        console.log('Mal');
        
        return res.status(500).json({
            msg:"Error interno",
            contenido:{
                err
            }
        })
    })*/
})


app.put('/productos/:idProducto', (req:Request, res:Response) =>{
    console.log("Api get productos");

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
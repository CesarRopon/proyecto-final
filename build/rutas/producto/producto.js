"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var producto_model_1 = __importDefault(require("../../modelos/producto.model"));
//import {upload} from '../../servidor';
var app = express_1.Router();
exports.app = app;
app.get('/productos', function (req, res) {
    producto_model_1.default.find({ blnActivo: true }).then(function (producto) {
        if (producto.length === 0) {
            return res.status(404).json({
                msg: "No hay",
                contenido: {
                    producto: producto
                }
            });
        }
        return res.status(200).json({
            msg: "Datos encontrados",
            contenido: {
                producto: producto
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Error interno",
            contenido: {
                err: err
            }
        });
    });
});
app.get('/productos/:idProducto', function (req, res) {
    var idProducto = req.params.idProducto;
    producto_model_1.default.find({ '_id': idProducto }).then(function (producto) {
        if (producto.length <= 0) {
            return res.status(404).json({
                msg: "No hay productos",
                contenido: {
                    producto: producto
                }
            });
        }
        return res.status(200).json({
            msg: "Datos encontrados",
            contenido: {
                producto: producto
            }
        });
    }).catch(function (producto) {
        return res.status(500).json({
            msg: "Error interno",
            contenido: {
                producto: producto
            }
        });
    });
});
app.post('/productos', function (req, res, next) {
    /*upload.single('strImg')(req, res, function(error: any){
        if(error){
            console.log('No jale ue');
            
        }else{
            console.log("NO mms");
        }
        
    })*/
    var newProducto = req.body;
    new producto_model_1.default(newProducto).save().then(function (producto) {
        if (!producto) {
            return res.status(404).json({
                mensaje: "Error de insercion",
                contenido: "No se pudo insertar"
            });
        }
        var strNombre = newProducto.strNombre, nmbCosto = newProducto.nmbCosto;
        return res.status(200).json({
            mensaje: strNombre + " con precio $" + nmbCosto + " se dio de alta",
            contenido: producto
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
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
        mensaje: ""
    })
   }else{
    return res.json({
        mensaje:""
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
});
app.put('/productos/:idProducto', function (req, res) {
    console.log("Api get productos");
    var idProducto = req.params.idProducto;
    var productUpdated = req.body;
    producto_model_1.default.findByIdAndUpdate(idProducto, { $set: productUpdated }).then(function (producto) {
        if (!producto) {
            return res.status(404).json({
                msg: "Intentalo de nuevo",
                contenido: {
                    producto: producto
                }
            });
        }
        return res.status(200).json({
            msg: "Producto",
            contenido: {
                producto: producto
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            msg: "Error interno",
            contenido: {
                err: err
            }
        });
    });
});
app.delete('/productos/:idProducto', function (req, res) {
    var idProducto = req.params.idProducto;
    producto_model_1.default.findByIdAndUpdate(idProducto, { blnActivo: false }).then(function (producto) {
        if (!producto) {
            return res.status(404).json({
                msg: "Intentalo de nuevo",
                contenido: {
                    producto: producto
                }
            });
        }
        return res.status(200).json({
            msg: "Dado de baja",
            contenido: {
                producto: producto
            }
        });
    }).catch(function (producto) {
        return res.status(500).json({
            msg: "Error interno",
            contenido: {
                producto: producto
            }
        });
    });
});

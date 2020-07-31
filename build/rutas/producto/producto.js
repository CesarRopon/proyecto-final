"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var producto_model_1 = __importDefault(require("../../modelos/producto.model"));
var fileUpload_1 = require("../../librerias/fileUpload");
var app = express_1.Router();
exports.app = app;
app.get('/productos', function (req, res) {
    producto_model_1.default.find({ blnActivo: true }).then(function (producto) {
        if (producto.length === 0) {
            return res.json({
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
app.post('/productos', function (req, res) {
    console.log(req.body);
    var newProd = req.body;
    var fileUpload = new fileUpload_1.FileUpload('imgProductos', ['image/jpeg', 'image/png']);
    var nombreImg;
    if (req.files) {
        var file = req.files.strImg;
        try {
            nombreImg = fileUpload.subirArchivo(file);
            console.log(nombreImg);
            newProd.strImg = nombreImg;
            newProd.strImg = nombreImg;
        }
        catch (error) {
            console.log(error.toString());
        }
    }
    new producto_model_1.default(newProd).save().then(function (producto) {
        if (!producto) {
            return res.status(404).json({
                msg: "Intentalo de nuevo",
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
        fileUpload.eliminarArchivo(nombreImg);
        return res.status(500).json({
            msg: "Error interno",
            contenido: {
                err: err
            }
        });
    });
});
app.post('/productos/:idProducto', function (req, res) {
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

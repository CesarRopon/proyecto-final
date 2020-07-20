"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var esquemaProducto = new mongoose_1.Schema({
    strDescripcion: {
        type: String,
        required: [true, 'Debe haber descripcion']
    },
    strImg: {
        type: String,
        required: [true, 'Inserta una imagen de producto']
    },
    blnActivo: {
        type: Boolean,
        default: true
    },
    nmbCosto: {
        type: Number,
        required: [true, 'Debes de poner un precio']
    }
}, { collection: "producto" });
exports.default = mongoose_1.model('producto', esquemaProducto);

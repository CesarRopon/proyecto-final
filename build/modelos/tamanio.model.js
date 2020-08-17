"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var esquemaTamanio = new mongoose_1.Schema({
    strDescripcion: {
        type: String,
        required: [true, 'No se ingreso la dscripcion del tamaño']
    },
    nmbCosto: {
        type: Number,
        required: [true, 'Se necesita saber el precio por tamaño']
    },
    blnActivo: {
        type: Boolean,
        default: true
    }
});
exports.default = mongoose_1.model('tamanio', esquemaTamanio);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var esquemaCliente = new mongoose_1.Schema({
    strEmail: {
        type: String,
        required: [true, 'No se especifico un email']
    },
    strPassword: {
        type: String,
        required: [true, 'No se especifico una contraseña']
    },
    strNombre: {
        type: String,
        required: [true, 'No se especifico un nombre']
    },
    strApellidos: {
        type: String,
        required: [true, 'No se especificaron apellidos']
    },
    strTelefono: {
        type: String,
        required: [true, 'No se especifico telefono']
    },
    blnActivo: {
        type: Boolean,
        default: true
    }
}, { collection: "cliente" });
exports.default = mongoose_1.model('cliente', esquemaCliente);

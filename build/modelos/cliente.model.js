"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ubicacionCliente_model_1 = __importDefault(require("../modelos/ubicacionCliente.model"));
var comentario_model_1 = __importDefault(require("./comentario.model"));
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
    },
    aJsnUbicacion: [ubicacionCliente_model_1.default.schema],
    aJsnComentario: [comentario_model_1.default.schema],
}, { collection: "cliente" });
exports.default = mongoose_1.model('cliente', esquemaCliente);

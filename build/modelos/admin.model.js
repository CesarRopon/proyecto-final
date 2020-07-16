"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
//npm install firebase-admin
var esquemaAdmin = new mongoose_1.Schema({
    strEmail: {
        type: String,
        required: [true, 'Se necesita Email']
    },
    strPassword: {
        type: String,
        required: [true, 'Se necesita Email']
    },
    strNombre: {
        type: String,
        required: [true, 'Se necesita Email']
    },
    strApellidos: {
        type: String,
        required: [true, 'Se necesita Email']
    },
    strTelefono: {
        type: String,
        required: [true, 'Se necesita Email']
    },
    nmbLatitud: Number,
    nmbLongitud: Number
}, { collection: "admin" });
/*
    strEmail: {
        type:String,
        required:[true, 'No se especifico un email']
    },
    strPassword: {
        type:String,
        required:[true, 'No se especifico contraseña']
    },
    strNombre: {
        type:String,
        required:[true, 'No se especifico nombre(s)']
    },
    strApellidos: {
        type:String,
        required:[true, 'No se especificaron apellidos']
    },
    nmbLatitud: Number,
    nmbLongitud:Number},
    {collection: "admin"}*/
exports.default = mongoose_1.model('admin', esquemaAdmin);

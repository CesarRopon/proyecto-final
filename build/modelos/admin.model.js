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
        required: [true, 'Se necesita pass']
    },
    strNombre: {
        type: String,
        required: [true, 'Se necesita nombre']
    },
    strApellidos: {
        type: String,
        required: [true, 'Se necesita apellidos']
    },
    strTelefono: {
        type: String,
        required: [true, 'Se necesita telefono']
    },
    nmbLatitud: Number,
    nmbLongitud: Number
}, { collection: "admin" });
exports.default = mongoose_1.model('admin', esquemaAdmin);

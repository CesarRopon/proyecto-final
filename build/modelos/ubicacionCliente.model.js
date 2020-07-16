"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var esquemaUbicacion = new mongoose_1.Schema({
    nmbLatitud: Number,
    nmbLongitud: Number,
    strCalle: String,
    strColonia: String,
    strAliasUbicacion: String,
});
exports.default = mongoose_1.model('ubicacion', esquemaUbicacion);

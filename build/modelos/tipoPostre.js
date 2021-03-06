"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schemaTipoPostre = new mongoose_1.Schema({
    strDescripcion: {
        type: String,
        required: [true, 'Descripcion de tipoPostreNecesaria']
    },
    nmbCosto: Number
}, { collection: 'tipopostre' });
exports.default = mongoose_1.model('tipopostre', schemaTipoPostre);

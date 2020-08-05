"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var esquemaEspecialidad = new mongoose_1.Schema({
    strDescripcion: {
        type: String,
        required: [true, 'Necesita insertar descripcion']
    },
    nmbCosto: {
        type: Number,
        required: [true, 'Costo necesario']
    }
}, { collection: 'especialidad' });
exports.default = mongoose_1.model('especialidad', esquemaEspecialidad);

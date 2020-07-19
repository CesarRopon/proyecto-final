"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var esquemaEspecialidad = new mongoose_1.Schema({
    strDescripcion: {
        type: String,
        required: [true, 'Necesitas costo']
    },
    nmbCosto: {
        type: Number,
        required: [true, 'Necesitas costo']
    },
    blnActivo: {
        type: Boolean,
        default: true
    }
}, { collection: 'especialidad' });
exports.default = mongoose_1.model('especialidad', esquemaEspecialidad);

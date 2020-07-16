"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var esquemaDetallePedido = new mongoose_1.Schema({
    idProducto: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, 'No se recibio el idProducto'],
        ref: 'producto'
    },
    idTamanio: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, 'No se recibio el idTamanio'],
        ref: 'tamanio'
    },
    idEspecialidad: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, 'No se recibio el idEspecialidad'],
        ref: 'especialidad'
    },
    modelo: String
});
exports.default = mongoose_1.model('detalle', esquemaDetallePedido);

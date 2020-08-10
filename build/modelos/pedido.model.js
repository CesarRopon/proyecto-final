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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var detallePedido_model_1 = __importDefault(require("../modelos/detallePedido.model"));
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var fechaActual = new Date();
var fechaStr = fechaActual.getDate() + " " + meses[fechaActual.getMonth()] + " " + fechaActual.getFullYear();
var esquemaPedido = new mongoose_1.Schema({
    idUbicacion: {
        type: mongoose_1.default.Types.ObjectId,
        //required:[true, 'Se necesita idUbicacion'],
        ref: 'ubicacion'
    },
    idCliente: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, 'No se recibio el idCliente'],
        ref: 'cliente'
    },
    nmbMonto: {
        type: Number,
        required: [true, 'No se recibio el monto'],
        default: 0
    },
    blnStatus: {
        type: Boolean,
        default: true
    },
    dteFechaAlta: {
        type: String,
        required: [true, 'No se recibio fecha alta'],
        default: new Date()
    },
    strFechaAlta: {
        type: String,
        required: [true, 'Fecha de alta necesaria'],
        default: fechaStr
    },
    dteFechaEntrega: Date,
    strFechaEntrega: String,
    aJsnDetallePedido: [detallePedido_model_1.default.schema]
}, { collection: 'pedido' });
exports.default = mongoose_1.model('pedido', esquemaPedido);

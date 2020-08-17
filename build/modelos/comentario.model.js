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
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var fechaActual = new Date();
var fechaStr = fechaActual.getDate() + " " + meses[fechaActual.getMonth()] + " " + fechaActual.getFullYear();
var schemaComent = new mongoose_1.Schema({
    idCliente: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: 'cliente'
    },
    idAdmin: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'admin'
    },
    strComentario: {
        type: String,
        required: [true, "No se agrego comentario"]
    },
    dteFechaComentario: {
        type: String,
        required: [true, "No se agrego fecha comentario"],
        default: fechaStr
    },
    blnStatus: {
        type: Boolean,
        default: false
    },
    strContestacion: String,
    dteFechaContestacion: String
}, { collection: 'comentario' });
exports.default = mongoose_1.model('comentario', schemaComent);

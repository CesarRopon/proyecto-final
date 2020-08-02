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
exports.FileUpload = void 0;
var Uniqid = __importStar(require("uniqid"));
var Path = __importStar(require("path"));
var Fs = __importStar(require("fs"));
var FileUpload = /** @class */ (function () {
    function FileUpload(strRuta, extensiones) {
        this.strRuta = strRuta;
        this.extensiones = extensiones;
    }
    FileUpload.prototype.subirArchivo = function (file) {
        var nombreImg = Uniqid.default() + Path.extname(file.name);
        console.log(nombreImg);
        if (!this.extensiones.includes(file.mimetype)) {
            throw new Error("No es una extension permitida");
        }
        file.mv(Path.resolve(__dirname, "../../uploads/" + this.strRuta + "/" + nombreImg)).catch(function (err) {
            throw new Error("No se pudo subir el archivo");
        });
        return nombreImg;
    };
    FileUpload.prototype.eliminarArchivo = function (strNombreArchivo) {
        var file = Path.resolve(__dirname, "../../uploads/" + this.strRuta + "/" + strNombreArchivo);
        if (Fs.existsSync(file)) {
            Fs.unlinkSync(file);
        }
    };
    return FileUpload;
}());
exports.FileUpload = FileUpload;

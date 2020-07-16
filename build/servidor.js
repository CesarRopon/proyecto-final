"use strict";
//importaciones
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
var express_1 = __importDefault(require("express"));
require("./config/config");
var mongoose_1 = __importDefault(require("mongoose"));
var bodyParser = __importStar(require("body-parser")); //se le pone un alias a la importacion de body-parser
var index_1 = __importDefault(require("./rutas/index"));
var cors = require('cors');
//Declaraciones
var app = express_1.default();
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};
app.use(cors(corsOptions));
/*
  app.use((req, res, next) => {
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});
*/
//Rutas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //Esto se pone para usar el body-parser
app.use('/api', index_1.default); // en routes se recibe la ruta de la api y se le concatena /api, ejemplo /api/algo/idAlgo. /algo/idAlgo = routes
//Conexion a la bd
mongoose_1.default.connect("" + process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function (resp) {
    console.log("[MONGODB] Se ha conectado satisfactoriamente a la base de datos");
}).catch(function (err) {
    console.log("[MONGODB] Ocurrio un error al intentar conectar la base de datos");
});
//Conectar servidor
app.listen(process.env.PORT, function () {
    console.log("[SERVIDOR] Servidor conectado correctamente al puerto " + process.env.PORT);
});

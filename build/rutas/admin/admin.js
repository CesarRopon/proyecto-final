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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//Importaciones necesarias
var express_1 = require("express");
var admin_model_1 = __importDefault(require("../../modelos/admin.model"));
var admin_model_2 = __importDefault(require("../../modelos/admin.model"));
var Bcrypt = __importStar(require("bcrypt"));
var jwt = __importStar(require("jsonwebtoken"));
var verificarToken_1 = require("../../middlewares/verificarToken");
//declaraciones
var app = express_1.Router();
exports.app = app;
//
app.get('/admin', verificarToken_1.verificaToken, function (req, res) {
    admin_model_1.default.find().then(function (admin) {
        if (admin.length == 0) {
            return res.status(404).json({
                mensaje: "no admins",
                contenido: "No hay administradores"
            });
        }
        return res.status(200).json({
            mensaje: "Todo bien, todo correcto",
            contenido: {
                admin: admin
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: err
        });
    });
});
app.post('/admin', function (req, res) {
    var admin = req.body;
    //Encriptar contraseña
    admin.strPassword = Bcrypt.hashSync(admin.strPassword, 10);
    new admin_model_1.default(admin).save().then(function (administrador) {
        if (!administrador) {
            return res.status(404).json({
                mensaje: "0",
                contenido: "Ha ocurrido un error, intentalo de nuevo"
            });
        }
        return res.status(200).json({
            mensaje: "Administrador dado de alta",
            contenido: administrador
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "0",
            contenido: "Te han faltado campos por llenar"
        });
    });
});
app.put('/admin/:idAdmin', verificarToken_1.verificaToken, function (req, res) {
    var idAdmin = req.params.idAdmin;
    var admin = req.body;
    admin._id = idAdmin;
    if (idAdmin.length < 24 || idAdmin.length > 24) {
        return res.json({
            mensaje: "Error de id",
            contenido: "El id debe tener un fotmato valido"
        });
    }
    admin_model_1.default.findByIdAndUpdate(idAdmin, { $set: admin }).then(function (admin) {
        if (!admin) {
            return res.status(404).json({
                mensaje: "No se encontro el id",
                contenido: admin
            });
        }
        var strNombre = admin.strNombre, strApellidos = admin.strApellidos;
        return res.status(200).json({
            mensaje: "se actualizo corectamente el usuario " + strNombre + " " + strApellidos,
            contenido: admin
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Algo salio mal",
            contenido: err
        });
    });
});
//get especifico by email
app.get('/admin/:strEmail', function (req, res) {
    var strEmail = req.params.strEmail;
    admin_model_1.default.find({ strEmail: strEmail }).then(function (admin) {
        if (admin.length > 0) {
            return res.status(200).json({
                mensaje: "Persona encontrada",
                contenido: admin
            });
        }
        return res.json({
            mensaje: "Usuario no encontrado",
            contenido: "Prueba con otro usuario"
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
app.get('/admins/:idAdmin', verificarToken_1.verificaToken, function (req, res) {
    var idAdmin = req.params.idAdmin;
    admin_model_1.default.findById(idAdmin).then(function (admin) {
        if (!admin) {
            return res.json({
                mensaje: "No se encontro",
                contenido: admin
            });
        }
        return res.json({
            msg: "Usuario encontrado",
            contenido: admin
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: 'Error interno',
            contenido: err
        });
    });
});
app.delete('/admins/:idAdmin', function (req, res) {
    var idAdmin = req.params.idAdmin;
    if (idAdmin.length < 24 || idAdmin.length > 24) {
        return res.json({
            mensaje: "Error de id",
            contenido: "Este id debe tener un formato valido"
        });
    }
    admin_model_2.default.findByIdAndRemove(idAdmin).then(function (admin) {
        if (!admin) {
            return res.status(404).json({
                mensaje: "Error en la eliminacion",
                contenido: "No se pudo eliminar"
            });
        }
        return res.status(200).json({
            mensaje: "Eliminado",
            contenido: admin
        });
    }).catch(function (err) {
        return res.status(500).json({
            mensaje: "Error interno",
            contenido: err
        });
    });
});
//metodo post para autenticacion de admin
app.post('/admin/login', function (req, res) {
    var _a = req.body, strEmail = _a.strEmail, strPassword = _a.strPassword;
    admin_model_2.default.findOne({ strEmail: strEmail }).then(function (admin) {
        if (!admin) {
            return res.json({
                mensaje: "Correo incorrecto",
                contenido: admin
            });
        }
        Bcrypt.compare(strPassword, admin.strPassword).then(function (resp) { return __awaiter(void 0, void 0, void 0, function () {
            var token, strNombre, strApellidos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!resp) {
                            return [2 /*return*/, res.json({
                                    mensaje: "Contraseña incorrecta",
                                    contenido: resp
                                })];
                        }
                        return [4 /*yield*/, jwt.sign({ admin: admin }, "" + process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })];
                    case 1:
                        token = _a.sent();
                        strNombre = admin.strNombre, strApellidos = admin.strApellidos;
                        return [2 /*return*/, res.status(200).json({
                                mensaje: "Bienvenido al sistema " + strNombre + " " + strApellidos,
                                contenido: admin,
                                token: token
                            })];
                }
            });
        }); }).catch(function (err) {
            return res.json({
                mensaje: "Error al ingresar",
                contenido: err
            });
        });
    }).catch(function (err) {
        return res.json({
            mensaje: "Error al ingresar",
            contenido: err
        });
    });
});
app.put('/admins/changePass/:strEmail', function (req, res) {
    var emailAdmin = req.params.strEmail;
    var newPass = req.body.strPassword;
    console.log(newPass + " " + emailAdmin);
    admin_model_2.default.findOne({ strEmail: emailAdmin }).then(function (admin) {
        if (!admin) {
            return res.json({
                mensaje: "No existe el correo"
            });
        }
        newPass = Bcrypt.hashSync(newPass, 10);
        admin_model_2.default.findByIdAndUpdate(admin._id, { strPassword: newPass }).then(function (passChanged) {
            if (!passChanged) {
                return res.json({
                    mensaje: "No se pudo cambiar la contraseña"
                });
            }
            return res.json({
                mensaje: "Contraseña actualizada"
            });
        }).catch(function () {
            return res.json({
                mensaje: "Error interno dada"
            });
        });
    }).catch(function (err) {
        return res.json({
            mensaje: err
        });
    });
});

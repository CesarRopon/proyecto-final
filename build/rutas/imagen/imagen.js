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
exports.app = void 0;
var express_1 = require("express");
var Path = __importStar(require("path"));
var Fs = __importStar(require("fs"));
var app = express_1.Router();
exports.app = app;
app.get('/imagenes/:strRuta/:strImg', function (req, res) {
    var strRuta = req.params.strRuta;
    var strImg = req.params.strImg;
    var file = Path.resolve(__dirname, "../../../uploads/" + strRuta + "/" + strImg);
    //let imgByDefect = Path.resolve(__dirname, `../../uploads/assets/imgbydefect`)
    if (Fs.existsSync(file)) {
        return res.sendFile(file);
    }
    else {
        //return res.sendFile(imgByDefect);
    }
});

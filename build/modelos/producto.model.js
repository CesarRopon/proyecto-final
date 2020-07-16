"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var esquemaProducto = new mongoose_1.Schema({});
exports.default = mongoose_1.model('producto', esquemaProducto);

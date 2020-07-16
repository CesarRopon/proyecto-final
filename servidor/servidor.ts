//importaciones

import express from "express";
import "./config/config";
import mongoose from "mongoose";
import * as bodyParser from "body-parser"; //se le pone un alias a la importacion de body-parser
import routes from "./rutas/index";
var cors = require('cors');


//Declaraciones
const app = express();


  
app.use((req, res, next) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//Rutas
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) //Esto se pone para usar el body-parser
app.use('/api',routes); // en routes se recibe la ruta de la api y se le concatena /api, ejemplo /api/algo/idAlgo. /algo/idAlgo = routes

//Conexion a la bd
mongoose.connect("mongodb+srv://d39cef66:d39cef66@appadmin.bxxb3.mongodb.net/mongoprueba?retryWrites=true&w=majority", {
    //useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((resp: any)=>{
    console.log("[MONGODB] Se ha conectado satisfactoriamente a la base de datos");
}).catch((err:any) =>{
    console.log("[MONGODB] Ocurrio un error al intentar conectar la base de datos");
})


//Conectar servidor
app.listen(process.env.PORT, () =>{
    console.log(`[SERVIDOR] Servidor conectado correctamente al puerto ${process.env.PORT}`);
})
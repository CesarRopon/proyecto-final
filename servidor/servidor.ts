//importaciones

import express, { response } from "express";
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
mongoose.connect(`${process.env.URLDB}`, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((resp: any)=>{
    
    return response.status(200).json({
        mensaje:"Noma por dos"
    })
}).catch((err:any) =>{
    return response.status(500).json({
        mensaje:"noma"
    })
})


//Conectar servidor
app.listen(process.env.PORT, () =>{
    console.log(`[SERVIDOR] Servidor conectado correctamente al puerto ${process.env.PORT}`);
})
//importaciones 

import express from "express";
import mongoose from "mongoose";
import {app as admin} from '../rutas/admin/admin';
import {app as cliente} from '../rutas/cliente/cliente';
import {app as ubicacionCliente} from "../rutas/ubicacionCliente/ubicacionCliente";
import ubicacionClienteModel from "../modelos/ubicacionCliente.model";

//decalraciones
const routes = express();


//middlewares
routes.use(cliente);
routes.use(admin);
routes.use(ubicacionCliente);





export default routes;
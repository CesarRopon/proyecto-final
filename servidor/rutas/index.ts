//importaciones 

import express from "express";
import mongoose from "mongoose";
import {app as admin} from '../rutas/admin/admin';
import {app as cliente} from '../rutas/cliente/cliente';

//decalraciones
const routes = express();


//middlewares
routes.use(cliente);
routes.use(admin);





export default routes;
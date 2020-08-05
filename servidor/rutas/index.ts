//importaciones 

import express, { Router } from "express";
import mongoose from "mongoose";
import {app as admin} from './admin/admin';
import {app as cliente} from './cliente/cliente';
import {app as ubicacionCliente} from "./ubicacionCliente/ubicacionCliente";
import {app as detalle } from './detallePedido/detallePedido';
import {app as especialidad} from './especialidad/especialidad';
import {app as pedido} from './pedido/pedido';
import {app as producto} from './producto/producto';
import {app as tamanio} from './tamanio/tamanio';
import {app as comentarios} from './comentariosCiente/comentarioCliente';
import {app as tipopostre} from './tipopostre/tipopostre';
import {app as imagenes} from './imagen/imagen';
//decalraciones
const routes = express();


//middlewares
routes.use(cliente);
routes.use(admin);
routes.use(ubicacionCliente);
routes.use(detalle);
routes.use(especialidad);
routes.use(pedido);
routes.use(producto);
routes.use(tamanio);
routes.use(comentarios);
routes.use(tipopostre);
routes.use(imagenes);




export default routes;
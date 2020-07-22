//importaciones 

import express from "express";
import mongoose from "mongoose";
import {app as admin} from '../rutas/admin/admin';
import {app as cliente} from '../rutas/cliente/cliente';
import {app as ubicacionCliente} from "../rutas/ubicacionCliente/ubicacionCliente";
import {app as detalle } from '../rutas/detallePedido/detallePedido';
import {app as especialidad} from '../rutas/especialidad/especialidad';
import {app as pedido} from '../rutas/pedido/pedido';
import {app as producto} from '../rutas/producto/producto';
import {app as tamanio} from '../rutas/tamanio/tamanio';
import {app as comentarios} from '../rutas/comentariosCiente/comentarioCliente';

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
routes.use(comentarios)





export default routes;
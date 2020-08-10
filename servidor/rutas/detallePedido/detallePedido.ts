import {Router, Request, Response} from 'express';
import detalleModel, {IDetallePedido} from '../../modelos/detallePedido.model';
import pedidoModel ,{IPedido} from '../../modelos/pedido.model';
import { json } from 'body-parser';

const app :Router = Router();

app.get('/pedidos/:idPedido/detalles', (req:Request, res:Response) =>{

    let idPedido:string = req.params.idPedido;

    pedidoModel.find({_id:idPedido}).populate('idCliente').populate('aJsnDetallePedido.idProducto').then((detallesPedido:IPedido[] ) =>{

        if(detallesPedido.length ===0){
            return res.json({
                mensaje: "No hay pedido",
                contenido: "No existen pedidos"
            })
        }

        return res.status(200).json({
            mensaje: 'Detalles encontrados',
            contenido: detallesPedido
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje:"Error interno",
            contenido: err
        })
    })
})



app.get('/pedidos/:idPedido/detalles/:idProducto', (req:Request, res:Response) =>{

    let idPedido :string = req.params.idPedido;
    let idProducto :string = req.params.idProducto;
    
    
    pedidoModel.find({_id:idPedido, 'aJsnDetallePedido.idProducto':idProducto}).then((getPedido: IPedido[]) =>{
        if(getPedido.length>0){
            return res.json({
                mensaje:"Ya existe",
                contenido: "Este producto ya esta en tu carrito"
            })
        }
        return res.json({
            mensaje:"No existe",
            
        })
    }).catch(() =>{
        return res.json({
            mensaje:"Error interno",

        })
    })
})

app.post('/pedidos/:idPedido/detalles', (req:Request, res:Response) =>{

    let idPedido: string = req.params.idPedido;
    let newDetalle :IDetallePedido = req.body;
    console.log('sadasdas');
    console.log(newDetalle);
    
    pedidoModel.findByIdAndUpdate(idPedido, {$push :{'aJsnDetallePedido': newDetalle}})
    .then((newDetailInserted: IPedido | null) =>{
        if(!newDetailInserted){
            return res.json({
                mensaje: "Error de detalle",
                contenido: "Detalle no insertado"
            })
        }

        return res.status(200).json({
            mensaje:"Detalle insertado",
            contenido: newDetailInserted
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje: "Error interno",
            contenido: err
        })
    })
})


app.delete('/pedidos/:idPedido/detalles/:idDetalle', (req:Request, res:Response) =>{
    
    let idPedido :string = req.params.idPedido;
    let idDetalle: string = req.params.idDetalle;

    //Si jala este delete

    pedidoModel.findOneAndUpdate({_id:idPedido}, {$pull :{'aJsnDetallePedido':{ '_id':idDetalle}}}).
    then((pedidoDeleted: IPedido | null) =>{
        if(!pedidoDeleted){
            return res.json({
                mensaje:"Detalle no eliminado",
                contenido:pedidoDeleted
            })

        } 
        return res.status(200).json({
            mensaje: "Detalle eliminado",
            contenido: pedidoDeleted
        })
    }).catch((err: any)  =>{
        return res.json({
            mensaje: "Error interno",
            contenido: err
        })
    })
})






export {app}
import {Router, Request, Response} from 'express';
import detalleModel, {IDetallePedido} from '../../modelos/detallePedido.model';
import pedidoModel ,{IPedido} from '../../modelos/pedido.model';

const app :Router = Router();

app.get('/pedidos/:idPedido/detalles', (req:Request, res:Response) =>{

    let idPedido:string = req.params.idPedido;

    pedidoModel.find({_id:idPedido}).populate('idCliente').populate('aJsnDetallePedido.idProducto').then((detallesPedido:IPedido[] ) =>{

        if(!detallesPedido){
            return res.json({
                mensaje: "No hay pedido"
            })
        }

        return res.status(200).json({
            mensaje: 'Detalles encontrados',
            detallesPedido
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje:"Error interno",
            err
        })
    })
})


app.post('/pedidos/:idPedido/detalles', (req:Request, res:Response) =>{

    let idPedido: string = req.params.idPedido;
    let newDetalle :IDetallePedido = req.body;

    pedidoModel.findByIdAndUpdate(idPedido, {$push :{'aJsnDetallePedido': newDetalle}})
    .then((newDetailInserted: IPedido | null) =>{
        if(!newDetailInserted){
            return res.json({
                mensaje: "Detalle no insertado"
            })
        }

        return res.status(500).json({
            mensaje:"Detalle insertado",
            newDetailInserted
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje: "Error interno",
            err
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
            pedidoDeleted
            })

        } 
        return res.status(200).json({
            mensaje: "Detalle eliminado",
            pedidoDeleted
        })
    }).catch((err: any)  =>{
        return res.json({
            mensaje: "Error interno",
            err
        })
    })
})






export {app}
import {Router, Request, Response} from 'express';
import pedidoModel, {IPedido} from '../../modelos/pedido.model';

const app :Router = Router();

//Obtener todos los pedidos
app.get('/pedidos', (req:Request, res:Response) =>{

    pedidoModel.find({blnStatus:false}).populate('idCliente').then((pedidos : IPedido[] )=>{
        if(pedidos.length===0){
            return res.json({
                mensaje:"No hay pedidos",
                pedidos,
                mensaje2: req.get('host')
            })    
        }

        return res.status(200).json({
            mensaje:"Pedidos encontrados",
            pedidos,
            mensaje2: req.get('host')
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"Error interno",
            err
        })
    })
})


app.get('/pedidos/:idPedido/', (req:Request, res:Response)=>{

    let idPedido :string = req.params.idCliente;

    pedidoModel.findById(idPedido).populate('idCliente').then((pedidoEspecifico:IPedido | null) =>{
        if(!pedidoEspecifico){
           return res.json({
               mensaje: "No se encontro el pedido",
               pedidoEspecifico
           })     
        }
        return res.status(200).json({
            mensaje:"Pedido encontrado",
            pedidoEspecifico
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"Error interno",
            err
        })
    })
}) 


app.post('/pedidos',(req:Request, res:Response) =>{

    let pedido: IPedido = req.body;

    new pedidoModel(pedido).save().then((newPedido:IPedido) =>{
        if(!newPedido){
            return res.json({
                mensaje: "No se pudo hacer el pedido"
            })
        }
        return res.json({
            mensaje:"Pedido hecho, espera confirmacion del vendedor",
            newPedido
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"Error en el servidor",
            err
        })
    })
})

app.put('/pedidos/:idPedido', (req:Request, res:Response) =>{

    let idPedido :string = req.params.idPedido;
    let updatePedido: IPedido = req.body;
    pedidoModel.findByIdAndUpdate(idPedido, {$set: updatePedido}).then((pedidoUpdated: IPedido |null) =>{
        if(!pedidoUpdated){
            return res.json({
                mensaje:"No se pudo actualizar el pedido"

            })
        }

        return res.status(200).json({
            mensaje:"Pedido actualizado",
            pedidoUpdated
        })
    }).catch((err: any) =>{
        return res.json({
            mensaje:"Error interno",
            err
        })
    })
})












export {app}
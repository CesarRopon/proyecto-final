import {Router, Request, Response} from 'express';
import pedidoModel, {IPedido} from '../../modelos/pedido.model';

const app :Router = Router();

//Obtener todos los pedidos
app.get('/pedidos', (req:Request, res:Response) =>{

    pedidoModel.find({blnStatus:false}).populate('idCliente').then((pedidos : IPedido[] )=>{
        if(pedidos.length===0){
            return res.status(404).json({
                mensaje:"No hay pedidos",
                contenido: ""
            })    
        }

        return res.status(200).json({
            mensaje:"Pedidos encontrados",
            contenido:pedidos
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido:err
        })
    })
})


app.get('/pedidos/:idPedido', (req:Request, res:Response)=>{

    let idPedido :string = req.params.idPedido;
    let totalCarrito =0;
    pedidoModel.findById(idPedido).populate('idCliente').populate('idUbicacion').populate('aJsnDetallePedido.idProducto').then((pedidoEspecifico:IPedido | null) =>{
        if(!pedidoEspecifico){
           return res.status(404).json({
               mensaje: "No se encontro el pedido",
               contenido: ""
           })     
        }
        
        totalCarrito = pedidoEspecifico.aJsnDetallePedido.length
        return res.status(200).json({
            mensaje:"Pedido encontrado",
            contenido:pedidoEspecifico,
            totalCarrito
        })
    }).catch((err:any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido:err
        })
    })
}) 


app.post('/pedidos',(req:Request, res:Response) =>{

    let pedido: IPedido = req.body;
    
    new pedidoModel(pedido).save().then((newPedido:IPedido) =>{
        if(!newPedido){
            return res.status(404).json({
                mensaje: "No se pudo hacer el pedido",
                contenido: ""
            })
        }
        return res.status(200).json({
            mensaje:"Pedido hecho, espera confirmacion del vendedor",
            contenido: newPedido
        })
    }).catch((err:any) =>{
        return res.json({
            mensaje:"Error en el servidor",
            contenido: err
        })
    })
})

app.put('/pedidos/:idPedido', (req:Request, res:Response) =>{

    let idPedido :string = req.params.idPedido;
    let updatePedido: IPedido = req.body;
    pedidoModel.findByIdAndUpdate(idPedido, {$set: updatePedido}).then((pedidoUpdated: IPedido |null) =>{
        if(!pedidoUpdated){
            return res.json({
                mensaje:"No se pudo actualizar el pedido",
                contenido:""

            })
        }

        return res.status(200).json({
            mensaje:"Pedido actualizado",
            contenido: pedidoUpdated
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido: err
        })
    })
})


app.delete('/pedidos/:idPedido', (req:Request, res:Response) =>{

    let idPedido:string = req.params.idPedido;

    if(idPedido.length<24 ||idPedido.length>24){
        return res.json({
            mensaje:"Error de id",
            contenido: "Este es un formato no valido para id's"
        })
    }

    pedidoModel.findByIdAndUpdate(idPedido, {set: {blnStatus:true}}).then((pedido: IPedido | null) =>{
        if(!pedido){
            return res.status(404).json({
                mensaje: "Error de estatus",
                contenido: "No se pudo cambiar el estatus del pedido"
            })
        }

        return res.status(200).json({
            mensaje:"hecho",
            contenido: "Estatus cambiado"
        })
    }).catch((err: any) =>{
        return res.status(500).json({
            mensaje:"Error interno",
            contenido: err
        })
    }) 
})

export {app}
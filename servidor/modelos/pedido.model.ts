import mongoose, {Document, model, Schema} from 'mongoose';
import DetalleModel, {IDetallePedido} from '../modelos/detallePedido.model';

export interface IPedido extends Document{
    idCliente: string,
    nmbMonto: number,
    nmbAdelanto?: number,
    nmbRestante?: number,
    blnStatus: boolean,
    dteFechaAlta: Date,
    dteFechaPago?: Date,
    dteFechaEntrega?: Date,
    aJsnDetalle?: IDetallePedido[];
}

let esquemaPedido = new Schema({
    idCliente:{
        type:mongoose.Types.ObjectId,
        required:[true, 'No se recibio el idCliente'],
        ref: 'cliente'
    },
    nmbMonto:{
        type:Number,
        required:[true, 'No se recibio el monto']
    },
    nmbAdelanto:Number,
    nmbRestante:Number,
    blnStatus:{
            type:Boolean,
            default:false
    },
    dteFechaAlta:{
        type:Date,
        required:[true, 'No se recibio fecha alta']
    },
    dteFechaPago:Date,
    dteFechaEntrega:Date,
    
    aJsnDetalle:[DetalleModel.schema]},
    {collection: "pedido"}
)

export default model <IPedido>('pedido', esquemaPedido);
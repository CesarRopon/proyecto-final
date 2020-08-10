import mongoose, {Document, model, Schema} from 'mongoose';
import DetalleModel, {IDetallePedido} from '../modelos/detallePedido.model';



export interface IPedido extends Document{
    idCliente: string,
    idUbicacion?: string;
    nmbMonto?: number,
    blnStatus: boolean,
    dteFechaAlta: Date,
    dteFechaEntrega?: Date;
    strFechaEntrega?:string;
    strFechaAlta: string;
    aJsnDetallePedido:[IDetallePedido];
}

let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let fechaActual:Date = new Date();

let fechaStr = `${fechaActual.getDate()} ${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`
let esquemaPedido = new Schema({
    idUbicacion:{
        type:mongoose.Types.ObjectId,
        //required:[true, 'Se necesita idUbicacion'],
        ref: 'ubicacion'
    },
    idCliente:{
        type:mongoose.Types.ObjectId,
        required:[true, 'No se recibio el idCliente'],
        ref: 'cliente'
    },
    nmbMonto:{
        type:Number,
        required:[true, 'No se recibio el monto'],
        default :0
    },
    blnStatus:{
            type:Boolean,
            default:true
    },
    dteFechaAlta:{
        type:String,
        required:[true, 'No se recibio fecha alta'],
        default: new Date()
    },
    strFechaAlta:{
        type: String,
        required: [true ,'Fecha de alta necesaria'],
        default: fechaStr

    },
    dteFechaEntrega:Date,
    strFechaEntrega: String,
    aJsnDetallePedido:[DetalleModel.schema]},
    {collection: 'pedido'}
    )

export default model <IPedido>('pedido', esquemaPedido);
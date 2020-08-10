import mongoose, {Schema, Document, model} from 'mongoose';


export interface IDetallePedido extends Document{
    idProducto?: string;
    modelo?: string;
    strComentarios?: string,
    nmbCantidad?: number,
    nmbTotalCantidadPrecio?:number,
}

let esquemaDetallePedido  = new Schema({

    idProducto:{
        type:mongoose.Types.ObjectId,
        required:[true, 'Se necesita idProducto'],
        ref: 'producto'
    },
    nmbCantidad:{
        type:Number,
        default:1
    },
    nmbTotalCantidadPrecio:Number,
   /* idTipoPostre:{
        type:mongoose.Types.ObjectId,
        ref:'tipopostre'
    },
    idTamanio:{
        type:mongoose.Types.ObjectId,
        ref:'tamanio'
    },
    idEspecialidad:{
        type:mongoose.Types.ObjectId,
        ref: 'especialidad'
    },*/
    strModelo:String,
    strComentarios: String
})

export default model <IDetallePedido>('detalle', esquemaDetallePedido);

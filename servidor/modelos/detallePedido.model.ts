import mongoose, {Schema, Document, model} from 'mongoose';




export interface IDetallePedido extends Document{
    idProducto: string;
    idTamanio: string;
    idEspecialidad: string;
    modelo?: string;
    strComentarios: string,
   
}

let esquemaDetallePedido  = new Schema({

    idProducto:{
        type:mongoose.Types.ObjectId,
        required:[true, 'No se recibio el idProducto'],
        ref: 'producto'
    },
    idTamanio:{
        type:mongoose.Types.ObjectId,
        required:[true, 'No se recibio el idTamanio'],
        ref:'tamanio'
    },
    idEspecialidad:{
        type:mongoose.Types.ObjectId,
        required:[true, 'No se recibio el idEspecialidad'],
        ref: 'especialidad'
    },
    strModelo:String,
    strComentarios: String  
})

export default model <IDetallePedido>('detalle', esquemaDetallePedido);

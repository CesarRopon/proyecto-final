import mongoose, {Schema, Document, model} from 'mongoose';




export interface IDetallePedido extends Document{
    idProducto?: string;
    modelo?: string;
    strComentarios?: string,
}

let esquemaDetallePedido  = new Schema({

    idProducto:{
        type:mongoose.Types.ObjectId,
        required:[true, ' se necesita idProducto'],
        ref: 'producto'
    },
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

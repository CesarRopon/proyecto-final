import mongoose,{model, Schema, Document} from 'mongoose';


export interface ITamanio extends Document{
    strDescripcion: string;
    nmbCosto: Number;
    blnActivo : boolean
}
let esquemaTamanio = new Schema({
    strDescripcion:{
        type:String,
        required:[true, 'No se ingreso la dscripcion del tamaño']
    },
    nmbCosto:{
        type:Number,
        required:[true, 'Se necesita saber el precio por tamaño']
    },
    blnActivo: {
        type:Boolean,
        default:true
    }
})

export default model <ITamanio>('tamanio', esquemaTamanio);
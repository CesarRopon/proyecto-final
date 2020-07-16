import mongoose,{model, Schema, Document} from 'mongoose';


export interface ITamanio extends Document{
    strDescripcion: string;
    nmbCosto: Number;
}
let esquemaTamanio = new Schema({
    strDescripcion:{
        type:String,
        required:[true, 'No se ingreso el nombre del producto']
    },
    nmbCosto:{
        type:Number,
        required:[true, 'Se necesita saber el precio por tamaño']
    }
})

export default model <ITamanio>('tamanio', esquemaTamanio);
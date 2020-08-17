import mongoose, {Document, model, Schema, Collection} from 'mongoose';

export interface IComentario extends Document {
    idCliente:string;
    idAdmin ?: string,
    strComentario:string,
    strContestacion ?: string,
    dteFechaComentario: string,
    dteFechaContestacion?: string,
    blnStatus: boolean;
}


let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let fechaActual:Date = new Date();

let fechaStr = `${fechaActual.getDate()} ${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`
let schemaComent = new Schema({

    idCliente:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'cliente'
    },
    idAdmin:{
        type: mongoose.Types.ObjectId,
        ref:'admin'
    },
    strComentario: {
        type: String,
        required:[true, "No se agrego comentario"] 
    },
    dteFechaComentario:{
        type:String,
        required:[true, "No se agrego fecha comentario"],
        default: fechaStr
    },
    blnStatus:{
        type:Boolean,
        default:false
    },
    strContestacion :String,
    dteFechaContestacion: String},
    {collection: 'comentario'}
    )


export default model <IComentario>('comentario', schemaComent);
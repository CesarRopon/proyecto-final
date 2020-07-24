import mongoose, {Document, model, Schema} from 'mongoose';

export interface IComentario extends Document {
    idCliente:string
    idAdmin ?: string,
    strComentario:string,
    strContestacion ?: string,
    dteFechaComentario: String,
    dteFechaContestacion?: String,
    blnStatus: boolean;
}

let schemaComent = new Schema({
    idCliente:{
        type:mongoose.Types.ObjectId,
        required: true,
        ref: 'cliente'
    },
    idAmin:{
        type: mongoose.Types.ObjectId,
        ref:'admin'
    },
    strComentario: {
        type: String,
        required:true, 
    },
    dteFechaComentario:{
        type:String,
        required:true
    },
    blnStatus:{
        type:Boolean,
        default:false
    },
    strContestacion :String,
    dteFechaContestacion: String
}, {collection: 'comentario'}
)


export default model <IComentario>('comentario', schemaComent);
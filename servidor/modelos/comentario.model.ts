import mongoose, {Document, model, Schema} from 'mongoose';

export interface IComentario extends Document {

    idAdmin ?: string,
    strComentario:string,
    strContestacion ?: string,
    dteFechaComentario?: String,
    dteFechaContestacion?: String,
    blnStatus: boolean;
}

let schemaComent = new Schema({
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
    strFechaContestacion :String,
    dteFechaContestacion: String
}, {collection: 'comentario'}
)


export default model <IComentario>('comentario', schemaComent);
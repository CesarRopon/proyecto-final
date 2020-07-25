import mongoose, {Document, model, Schema, Collection} from 'mongoose';

export interface IComentario extends Document {
    idAdmin ?: string,
    strComentario:string,
    strContestacion ?: string,
    dteFechaComentario: string,
    dteFechaContestacion?: string,
    blnStatus: boolean;
}

let schemaComent = new Schema({

    idAdmin:{
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
})


export default model <IComentario>('comentario', schemaComent);
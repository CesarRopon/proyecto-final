import mongoose,{model, Schema, Document} from 'mongoose';


export interface IEspecialidad extends Document{
    strDescripcion: string,
    nmbCosto: number,
    blnActivo: boolean
}
let esquemaEspecialidad = new Schema({
    strDescripcion: {
        type:String,
        required: [true, 'Necesitas costo']
    },
    nmbCosto: {
        type:Number,
        required: [true, 'Necesitas costo']
    },
    blnActivo : {
        type: Boolean,
        default: true
    }},
    {collection: 'especialidad'}
)

export default model <IEspecialidad>('especialidad', esquemaEspecialidad);
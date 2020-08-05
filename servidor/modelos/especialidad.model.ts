import mongoose,{model, Schema, Document} from 'mongoose';


export interface IEspecialidad extends Document{
    strDescripcion: string;
    nmbCosto: number;
}
let esquemaEspecialidad = new Schema({
    strDescripcion: {
        type:String,
        required: [true, 'Necesita insertar descripcion']
    },
    nmbCosto: {
        type:Number,
        required: [true, 'Costo necesario']
    }},
    {collection: 'especialidad'}
)

export default model <IEspecialidad>('especialidad', esquemaEspecialidad);
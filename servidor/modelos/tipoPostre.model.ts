import {model, Document, Schema} from 'mongoose';

export interface ITipoPostre extends Document{
    strDescripcion:string;
    nmbCosto?: number;
    blnActivo: boolean;
}

let schemaTipoPostre = new Schema({

    strDescripcion:{
        type:String,
        required: [true, 'Descripcion de tipoPostreNecesaria']
    },
    nmbCosto: {
        type: Number,
        default:0
    },
    blnActivo: {
        type: Boolean,
        default: true
    }},
    {collection: 'tipopostre'}
)

export default model <ITipoPostre>('tipopostre', schemaTipoPostre);
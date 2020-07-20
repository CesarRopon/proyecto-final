import {model, Document, Schema} from 'mongoose';

export interface ITipoPostre extends Document{
    strDescripcion:string,
    nmbCosto?: number
}

let schemaTipoPostre = new Schema({

    strDescripcion:{
        type:String,
        required: [true, 'Descripcion de tipoPostreNecesaria']
    },
    nmbCosto: Number},
    {collection: 'tipopostre'}
)

export default model <ITipoPostre>('tipopostre', schemaTipoPostre);
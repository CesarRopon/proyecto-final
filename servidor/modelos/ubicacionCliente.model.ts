import mongoose, {model, Document, Schema} from 'mongoose';


export interface IUbicacion extends Document{
    nmbLatitud?: number,
    nmbLongitud?: number,
    strCalle?: string,
    strColonia?: string,
    strAliasUbicacion?:string
}

let esquemaUbicacion = new Schema({
    nmbLatitud: Number,
    nmbLongitud: Number,
    strCalle: String,
    strColonia: String,
    strAliasUbicacion: String}
)

export default model <IUbicacion>('ubicacion', esquemaUbicacion)

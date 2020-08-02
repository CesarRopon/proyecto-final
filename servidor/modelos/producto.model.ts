import mongoose,{model, Schema, Document, Collection} from 'mongoose';


export interface IProducto extends Document{
    strNombre:string;
    strDescripcion:string;
    strImg?:string;
    blnActivo: boolean;
    nmbCosto: number
}
let esquemaProducto = new Schema({
    strNombre:{
        type:String,
        required:[true, 'Se necesita nombre']
    },
    strDescripcion: {
        type:String,
        required:[true, 'Debe haber descripcion']
    },
    strImg:{
        type:String,
    },
    blnActivo: {
        type: Boolean,
        default: true
    },

    nmbCosto:{
        type:Number, 
        required:[true, 'Debes de poner un precio']
    }
}, 
    {collection: "producto"}
)

export default model <IProducto>('producto', esquemaProducto);
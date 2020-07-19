import mongoose,{model, Schema, Document, Collection} from 'mongoose';


export interface IProducto extends Document{

    strDescripcion:string;
    strImg:string;
    blnActivo: boolean;
}
let esquemaProducto = new Schema({
    strDescripcion: {
        type:String,
        required:[true, 'Debe haber descripcion']
    },
    strImg:{
        type:String,
        required: [true, 'Inserta una imagen de producto']
    },
    blnActivo: {
        type: Boolean,
        default: true
    }
}, 
    {collection: "producto"}
)

export default model <IProducto>('producto', esquemaProducto);
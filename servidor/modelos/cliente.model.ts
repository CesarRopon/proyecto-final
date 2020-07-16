import mongoose, {Schema, model,Document} from 'mongoose';
import ubicacionModel ,{IUbicacion} from '../modelos/ubicacionCliente.model'; 

export interface ICliente extends Document{
    strEmail: string;
    strPassword: string;
    strNombre: string;
    blnActivo: boolean;
    strApellidos: string;
    strTelefono: string;
    aJsnUbicacion?:IUbicacion[];
}

let esquemaCliente = new Schema ({
    strEmail : {
        type:String,
        required: [true, 'No se especifico un email']
    },
    strPassword:{
        type:String,
        required: [true, 'No se especifico una contraseña']
    },
    strNombre:{
        type:String,
        required: [true, 'No se especifico un nombre']
    },  
     strApellidos:{
        type:String,
        required: [true, 'No se especificaron apellidos']
    }, 
    strTelefono:{
        type:String,
        required: [true, 'No se especifico telefono']
    },
    blnActivo:{
        type:Boolean,
        default:true
    },
    aJsnUbicacion:[ubicacionModel.schema]
}, {collection: "cliente"}
)

export default model <ICliente>('cliente', esquemaCliente);
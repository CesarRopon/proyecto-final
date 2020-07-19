import mongoose, {Document, Schema, model, Collection} from 'mongoose';


export interface IAdmin extends Document{
    strEmail: string;
	strPassword: string;
	strNombre: string;
    strApellidos: string;
    strTelefono:string;
    nmbLatitud?: number;
	nmbLongitud?: number;
}

//npm install firebase-admin
let esquemaAdmin = new Schema({

    strEmail:{
        type:String,
        required:[true, 'Se necesita Email']
    },
    strPassword:{
        type:String,
        required:[true, 'Se necesita Email']
    },
    strNombre:{
        type:String,
        required:[true, 'Se necesita Email']
    },
    strApellidos:{
        type:String,
        required:[true, 'Se necesita Email']
    },
    strTelefono:{
        type:String,
        required:[true, 'Se necesita Email']
    },
    nmbLatitud: Number,
    nmbLongitud:Number},
    {collection: "admin"}
    
)

export default model <IAdmin>('admin', esquemaAdmin);
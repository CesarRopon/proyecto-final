import mongoose,{model, Schema, Document} from 'mongoose';


export interface IEspecialidad extends Document{

}
let esquemaEspecialidad = new Schema({

})

export default model <IEspecialidad>('especialidad', esquemaEspecialidad);
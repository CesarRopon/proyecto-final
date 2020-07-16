import mongoose,{model, Schema, Document} from 'mongoose';


export interface IProducto extends Document{

}
let esquemaProducto = new Schema({

})

export default model <IProducto>('producto', esquemaProducto);
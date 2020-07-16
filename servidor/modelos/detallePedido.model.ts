import mongoose, {Schema, Document, model} from 'mongoose';
/*import ProductoModel, {IProducto} from '../modelos/producto.model';
import TamanioModel, {ITamanio} from '../modelos/tamanio.model';
import EspecialidadModel,{IEspecialidad} from '../modelos/especialidad.model';
*/

export interface IDetallePedido extends Document{
    idProducto: string;
    idTamanio: string;
    idEspecialidad: string;
    modelo?: string;
}

let esquemaDetallePedido  = new Schema({

    idProducto:{
        type:mongoose.Types.ObjectId,
        required:[true, 'No se recibio el idProducto'],
        ref: 'producto'
    },
    idTamanio:{
        type:mongoose.Types.ObjectId,
        required:[true, 'No se recibio el idTamanio'],
        ref:'tamanio'
    },
    idEspecialidad:{
        type:mongoose.Types.ObjectId,
        required:[true, 'No se recibio el idEspecialidad'],
        ref: 'especialidad'
    },
    modelo:String
})

export default model <IDetallePedido>('detalle', esquemaDetallePedido);

import multer from 'multer';
import * as uniqid from 'uniqid';
import path from 'path';

const storage = multer.diskStorage({
    destination:'uploads/imgProductos',
    filename:(req, file, cb) =>{
        cb(null,uniqid.default()+path.extname(file.originalname) );
    }
})

export default multer({storage})
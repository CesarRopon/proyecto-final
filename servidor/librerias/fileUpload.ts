import {UploadedFile} from 'express-fileupload'
import * as Uniqid from 'uniqid';
import * as Path from 'path';

import * as Fs from 'fs';
export class FileUpload{


    constructor(private strRuta:string, private extensiones:string[]){}

    subirArchivo(file: UploadedFile):string{
        let nombreImg = Uniqid.default() + Path.extname(file.name);
        console.log(nombreImg);
        
        if(!this.extensiones.includes(file.mimetype)){
            throw new Error("No es una extension permitida");
        }

        file.mv(Path.resolve(__dirname, `../../uploads/${this.strRuta}/${nombreImg}`)).catch((err:any) =>{
            throw new Error("No se pudo subir el archivo");
            
    });
        return nombreImg;   
    }


    eliminarArchivo(strNombreArchivo:string){
        let file= Path.resolve(__dirname, `../../uploads/${this.strRuta}/${strNombreArchivo}`);
        if(Fs.existsSync(file)){
            Fs.unlinkSync(file);
        }
    }
}
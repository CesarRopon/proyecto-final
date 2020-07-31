import {Request, Response, Router} from 'express';
import * as Path from 'path';
import * as Fs from 'fs';

const app :Router = Router();



app.get('/imagenes/:strRuta/:strImg', (req:Request, res:Response) =>{

    let strRuta:string = req.params.strRuta;
    let strImg:string = req.params.strImg;
    let file = Path.resolve(__dirname, `../../../uploads/${strRuta}/${strImg}`);
    
    
    //let imgByDefect = Path.resolve(__dirname, `../../uploads/assets/imgbydefect`)
    if(Fs.existsSync(file)){
        return res.sendFile(file);
    }else{
        //return res.sendFile(imgByDefect);
    }
})

export {app};
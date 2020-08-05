import * as jwt from 'jsonwebtoken';
import {Request, Response} from 'express'


const verificaToken = (req:Request, res:Response, next:any) =>{
    
    console.log(req.headers['authorization']);
    
    try {
        let cabeceraToken = req.headers['authorization'];
            if(typeof cabeceraToken ==='undefined'){
            }else{
                let bearer = cabeceraToken.split(" ");
                let token = bearer[1];
                jwt.verify(token, `${process.env.SEED}`);
                next();
    }
    } catch (error) {
        return res.json({
            mensaje:"Token invalido"
        })
    }
}


export {verificaToken}
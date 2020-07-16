
//variable global para el puerto

process.env.PORT = process.env.PORT || "3000";

//Variable global para el entorno de ejecucion

process.env.NODE_ENV = process.env.NODE_ENV  || "dev";


//variable global para la conexion a la bd

if(process.env.NODE_ENV === "dev"){
    process.env.URLDB = "mongodb://localhost:27017/bdLau";
}else{
    process.env.URLDB = "mongodb://localhost:27017/bdLau";
}


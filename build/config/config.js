"use strict";
//variable global para el puerto
process.env.PORT = process.env.PORT || "3000";
//Variable global para el entorno de ejecucion
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
//variable global para la conexion a la bd
if (process.env.NODE_ENV === "dev") {
    process.env.URLDB = "mongodb+srv://juliocesar12345:juliocesar12345@clusterappadmin.utrfc.gcp.mongodb.net/dbadmin?retryWrites=true&w=majority";
}
else {
    process.env.URLDB = "mongodb+srv://juliocesar12345:juliocesar12345@clusterappadmin.utrfc.gcp.mongodb.net/dbadmin?retryWrites=true&w=majority";
}

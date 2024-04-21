const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");

// creamos el servidor web
const app = express();

// vamos a configurar dotenv para poder utilizar las variables d entorno del .env
dotenv.config();

//! conectamos con la base de datos
connect();

//! ----------------- CONFIGURAR CLOUDINARY--------
const { configCloudinary } = require("./src/middleware/files.middleware");

configCloudinary();
//! -----------------VARIABLES CONSTANTES --> PORT

const PORT = process.env.PORT;

//! -----------------------CORS-------------  
//cors configura el acceso a la API, wylist: el origin 
const cors = require("cors");
app.use(cors());

//! ------------------ limitaciones de cantidad en el back end
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));// lo pongo en false para no interprestar la estructura anidada (querystring)y vaya más rapido
//

//! -----------------> RUTAS
const UserRoutes = require("./src/api/routes/User.routes");

app.use("/api/v1/users/", UserRoutes); // el endpoint

//! --------------- generamos un error de cuando no see encuentre la ruta
app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

//! ------------------> cuando el servidor crachea metemos un 500 ----------
app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "unexpected error");
});

//! ------------------ ESCUCHAMOS EN EL PUERTO EL SERVIDOR WEB-----

// esto de aqui  nos revela con que tecnologia esta hecho nuestro back
app.disable("x-powered-by");
app.listen(PORT, () => //habilita el puerto donde el servidor pede usarlo
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);


//los 3 pilares de una API:
/**
 * controladores: los consumen las rutas
 * rutas: las consume consume el index
 * modelos: los consumen los controladores
 */

// el cluster es un disco duro virtual
/**
 * AWS
 * CLOUD
 * AZURE
 */

// A la base de datos nos conectamos con Mongoose.
//cors configura el acceso a la API, wylist: el origin 
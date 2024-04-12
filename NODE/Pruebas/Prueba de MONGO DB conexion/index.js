const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");

// creamos el servidor web
const app = express();

// vamos a configurar dotenv para poder utilizar las variables d entorno del .env
dotenv.config();

//! conectamos con la base de datos
connect();

//! -----------------VARIABLES CONSTANTES --> PORT

const PORT = process.env.PORT;

//! ------------------ limitaciones de cantidad en el back end
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//! ------------------ ESCUCHAMOS EN EL PUERTO EL SERVIDOR WEB-----

app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);

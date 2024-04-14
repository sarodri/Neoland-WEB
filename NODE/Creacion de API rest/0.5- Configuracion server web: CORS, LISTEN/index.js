//requiero las librerias y configuro dotenv

const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();


//crear el server

const app = express();

// traigo la variable de entorno del puerto

const PORT = process.env.PORT;
console.log(PORT);

//!CORS: configurar el uso y  acceso al back

app.use(cors())

// limitaciones de cantidad en el backend : NO SE CAMBIA

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({limit:"5mb", extended: false}))

// hacer las rutas de la aplicacion


//! Errores generales del backend y ruta no encontrada

/**error 404 */
app.use("*", (req, res, next) =>{
    const error = new Error("Ruta no encontrada");
    error.status = 404;
    return next(error);
})
/**error 500 */
app.use((error, req, res) =>{
    return res
    .status(error.status || 500)
    .json(error.message|| "unexpected error")    
})


//!Escuchamos al servidor

app.disable("x-powered-by");
app.listen(PORT, () => console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`))
//requiero las librerias y configuro dotenv

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();


//crear el server

const app = express();

// traigo la variable de entorno del puerto

const PORT = process.env.PORT;
console.log(PORT);
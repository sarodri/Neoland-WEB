const express = require("express");
const { createMessage } = require("../controllers/Message.controllers");
const { isAuth } = require("../../middleware/auth.middleware");
const MessageRoutes = express.Router();

MessageRoutes.post("/:idRecipient", [isAuth], createMessage);
module.exports = MessageRoutes;

//populate() ,e hace una base de datos no relacional (MongoDB) ,en relacional (SQL) --> busca en el modelo correspondiente: lo convertimos porque hacemos referenciasa los modelos ref:"".
// user.routes.js
const { isAuth, isAuthAdmin } = require('../../middleware/auth.middleware');
const { upload } = require('../../middleware/files.middleware');
const {

    sendMailRedirect,
  registerWithRedirect,
 
} = require('./user.controllers');

const express = require('express');
const UserRoutes = express.Router();
//! ruta sin redirect
UserRoutes.post('/registerLargo', upload.single('image'), registerLargo);
UserRoutes.post('/registerUtil', upload.single('image'), registerUtil);

//! con redirect
UserRoutes.post('/register', upload.single('image'), registerWithRedirect);


//!---------------- REDIRECT-------------------------------
//lo que hay despues de los dos puntos en la ruta, lo reconoce como PARAMS en el req.params
UserRoutes.get('/register/sendMail/:id', sendMailRedirect); //donde pone:id, eso se llama -->PARA, ese id lo genera la base de datos, y luego lo usaremos para enviar el correo mediante ID
module.exports = UserRoutes;
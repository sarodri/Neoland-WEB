/**
 * La libreria express es la encargada de controlar y crear las rutas
 * tenemos metodos para crearlas que son : POST, GET, DELETE, PUSH, PATCH..
 */

const express = require("express");
const UserRoutes = express.Router();

const {
  registerLargo,
  registerUtil,
  registerWithRedirect,
  sendMailRedirect,
  resendCode,
  checkNewUser,
  login,
  autoLogin,
  changePassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser
} = require("../controllers/User.controllers");
const { upload } = require("../../middleware/files.middleware");
const { isAuth, isAuthAdmin } = require('../../middleware/auth.middleware');

//!------------------------------------------------------------------------
//?--------------------------------RUTAS SIN REDIRECT----------------------
//!------------------------------------------------------------------------

//SIEMPRE QUE EN LA RUTA HAY UPLOAD, HAY Q HACERLO CON UN MULTIPLATFORM
UserRoutes.post("/registerLargo", upload.single("image"), registerLargo); //usa middleware
UserRoutes.post("/registerUtil", upload.single("image"), registerUtil); //usa middleware
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/check", checkNewUser);
UserRoutes.post("/login", login);
UserRoutes.post("/autoLogin", autoLogin);
UserRoutes.patch("/forgotpassword", changePassword);
UserRoutes.patch("/changepassword", [isAuth], modifyPassword); //usa middleware y necesita un next() para ejecutar la funcion de isAuth
UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update);
UserRoutes.delete("/", [isAuth], deleteUser);

//!------------------------------------------------------------------------
//?--------------------------------RUTAS CON REDIRECT----------------------
//!------------------------------------------------------------------------
UserRoutes.post("/register", upload.single("image"), registerWithRedirect);

//!---------------- REDIRECT-------------------------------
UserRoutes.post("/register/sendMail/:id", sendMailRedirect);
UserRoutes.patch("/sendPassword/:id", sendPassword);

module.exports = UserRoutes;

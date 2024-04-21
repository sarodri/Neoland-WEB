//! -----------------------------------------------------------------------
//? ------------------------------librerias--------------------------------
//! -----------------------------------------------------------------------
const nodemailer = require("nodemailer");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

//! -----------------------------------------------------------------------
//? ------------------------------modelos----------------------------------
//! -----------------------------------------------------------------------
const User = require("../models/User.model");

//! -----------------------------------------------------------------------
//? ------------------------------utils - middlewares----------------------
//! -----------------------------------------------------------------------
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");

//------------------->CRUD es el acrónimo de "Crear, Leer, Actualizar y Borrar"
/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER LARGO EN CODIGO ------------------------
//! -----------------------------------------------------------------------------
const registerLargo = async (req, res, next) => {
  // capturamos la imagen nueva subida a cloudinary
  let catchImg = req.file?.path;
  try {
    // actualizamos los elementos unique del modelo
    await User.syncIndexes();

    const { email, name } = req.body; // lo que enviamos por la parte del body de la request

    // vamos a buscsar al usuario
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );

    if (!userExist) {
      let confirmationCode = randomCode();
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();
        if (userSave) {
          // ---------------------------> ENVIAR EL CODIGO CON NODEMAILER --------------------
          const emailEnv = process.env.EMAIL;
          const password = process.env.PASSWORD;

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailEnv,
              pass: password,
            },
          });

          const mailOptions = {
            from: emailEnv,
            to: email,
            subject: "Confirmation code",
            text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
                error
              });
            } 
              return res
                .status(200)
                .json({ user: createdUser, confirmation: confirmationCode });
            
          });
        } else {
          return res.status(404).json("error")
        }
      } catch (error) {
        return res.status(404).json(error.message)
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    // SIEMPRE QUE HAY UN ERROR GENERAL TENEMOS QUE BORRAR LA IMAGEN QUE HA SUBIDO EL MIDDLEWARE
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

module.exports = {
  registerLargo,
};

//! -----------------------------------------------------------------------------
//? ----------------------------METER REGISTER corto EN CODIGO ------------------------
//! -----------------------------------------------------------------------------
const registerCorto = async (req, res, next) => {
  // capturamos la imagen nueva subida a cloudinary
  let catchImg = req.file?.path;
  try {
    // actualizamos los elementos unique del modelo
    await User.syncIndexes();

    const { email, name } = req.body; // lo que enviamos por la parte del body de la request
      //siempre que hay asyncronias, va un try catch
    // vamos a buscsar al usuario
    const userExist = await User.findOne(//busca una coincidencia de almenos una de los dos
      { email: req.body.email },
      { name: req.body.name }
    );

    if (!userExist) {
      let confirmationCode = randomCode();// se manda el codigo por email
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {//comprueba si ha metido imagen, sino mete una por defecto
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();
        if (userSave) {//comprueba qu este guardado
          // ---------------------------> ENVIAR EL CODIGO CON NODEMAILER --------------------
          const emailEnv = process.env.EMAIL;
          const password = process.env.PASSWORD;

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailEnv,
              pass: password,
            },
          });

          const mailOptions = {
            from: emailEnv,
            to: email,
            subject: "Confirmation code",
            text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
          };
            //ya tengo las opciones y he creado la carta
          transporter.sendMail(mailOptions, (error, info) => {//esta funcion controla el envio del eamil
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
                error
              });
            } 
              return res
                .status(200)
                .json({ user: createdUser, confirmation: confirmationCode });
            
          });
        } else {
          return res.status(404).json("error")
        }
      } catch (error) {
        return res.status(404).json(error.message)
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist"); //ha comprobado que existe el usuario a traves del body
    }
  } catch (error) {
    // SIEMPRE QUE HAY UN ERROR GENERAL TENEMOS QUE BORRAR LA IMAGEN QUE HA SUBIDO EL MIDDLEWARE
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

module.exports = {
  registerLargo,
};

// si me da error al instalar--- sudo
//send email:  hasta que no se manda no me hace a respuesta
// HAY QUE ALADIR LOS ESTADOS DE SENDEMAIL: importar el seteo
//CON EL SETTIMEOUT ESPERO A QUE SE ENVIE EL MAIL Y LO EVALUE(que el sendemail setee los estados,le doy el tiempo que calcule oportuno(2500)): esto no es eficiente si tengo que meter un timeout
  /**CADA CATCH TIENE QUE TENER SU RESULUCION ->ERROR
   * 
   */

  //una vez que tenemos el controlador, nos falta LA RUTA.

  // 2 TIPOS DE BODYS: sin imagen JSON, con imagen MULTIPLARTFORM


  //TEORIA DEL REDIRECT--> LEERLO
  /**
   * 
   */
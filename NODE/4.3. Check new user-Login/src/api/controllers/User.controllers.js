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
//? ------------------------utils - middlewares - states ------------------
//! -----------------------------------------------------------------------
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");
const {
  getTestEmailSend,
  setTestEmailSend,
} = require("../../state/state.data");
const setError = require("../../helpers/handle-error");
const { generateToken } = require("../../utils/token");
const randomPassword = require("../../utils/randomPassword");

//------------------->CRUD es el acrónimo de "Crear, Leer, Actualizar y Borrar"
/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER LARGO EN CODIGO ------------------------
//! -----------------------------------------------------------------------------

const registerLargo = async (req, res, next) => {
  console.log("Entro en LARGO")
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

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            }
            console.log("Email sent: " + info.response);
            return res.status(200).json({
              user: userSave,
              confirmationCode,
            });
          });
        } else {
          return res.status(404).json("error save user");
        }
      } catch (error) {
        return res.status(404).json(error.message);
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
//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER CORTO EN CODIGO ------------------------
//! -----------------------------------------------------------------------------

const registerUtil = async (req, res, next) => {
  console.log("Entro en util")
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();

    const { email, name } = req.body;

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
          sendEmail(email, name, confirmationCode);
          setTimeout(() => {
            if (getTestEmailSend()) {
              // el estado ya utilizado lo reinicializo a false
              setTestEmailSend(false);
              return res.status(200).json({
                user: userSave,
                confirmationCode,
              });
            } else {
              setTestEmailSend(false);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            }
          }, 2500);
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

const registerWithRedirect = async (req, res, next) => {
  console.log("Entro en redirect")
  // capturamos la imagen por si hay un error borrarla en cloudinary
  let catchImg = req.file?.path;

  // Importante con el async await hacerlo con un try catch
  try {
    // actualizamos los indexes de los elementos unicos por si acaso han variado
    await User.syncIndexes();
    // Generamos el codigo con la funcion que hicimos en utils y que tienes mas arriba
    let confirmationCode = randomCode();

    // Hacemos destructuring del email y name que viene del body
    const { email, name } = req.body;

    // ---> comprobamos si existe el usuario

    // aqui se ponen el email y el name por separado porque ambos son unique,
    // si no fueran unique hay que meterlo como {email:req.body.email, name: req.body.name}
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );

    // SI NO EXISTE ENTONCES HACEMOS LA LÓGICA DEL REGISTER
    if (!userExist) {
      // Creamos un nuevo usuario con el req.body y le añadimos el codigo de confirmacion
      const newUser = new User({ ...req.body, confirmationCode });
      console.log(newUser);

      //  tenemos el archivo de la imagen le metemos el req.file.path que es donde guarda...
      // .. el middleware la URL de cloudinary
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        // si no nos pasa nada le pondremos una imagen predefinida
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }
      // -----> GUARDAMOS EL USUARIO EN LA DB
      try {
        const userSave = await newUser.save();

        if (userSave) {
          // si hay usuario hacemos el redirech
          return res.redirect(
            303,
            `http://localhost:8080/api/v1/users/register/sendMail/${userSave._id}`
          );
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      //----> SI EL USUARIO EXISTE:
      // + Borramos la imagen de cloudinary porque si existe no registramos el user
      // + Mandamos un error de que usuario ya existe
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    // si hay un error general borramos la URL porque no hemos registrado al usuario
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

/// ------------------------------------------------------------------------------------
/// --------------------CONTROLADOR DE ENVIAR EL CODE  ---------------------------------
///-------------------------------------------------------------------------------------

const sendMailRedirect = async (req, res, next) => {
  console.log("Entro en send")
  try {
    // nos traemos el id de los params
    const { id } = req.params;
    // buscamos al usuario por id para luego utilizarlo para sacar el email y el codigo
    const userDB = await User.findById(id);

    // ---------------------------CONFIGURAMOS NODEMAILER -----------------------------------
    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;
    // --> 1) Configuramos el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailEnv,
        pass: password,
      },
    });
    // --> 2) creamos las opciones del envio del email
    const mailOptions = {
      from: emailEnv,
      to: userDB.email,
      subject: "Confirmation code",
      text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
    };
    // --> 3) enviamos el correo y gestionamos el error o el ok del envio
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        // damos feedback al frontal de que no se ha enviado correctamente el codigo
        //TODO!  esto lo hacemos para que el frontal vuelva a enviar una request de este..
        // ... endpoint y vuelva a enviar el código al usuario.
        return res.status(404).json({
          user: userDB,
          confirmationCode: "error, resend code",
        });
      } else {
        console.log("Email sent: " + info.response);
        // damos feedback al frontal de que se ha enviado correctamente el codigo
        return res.status(200).json({
          user: userDB,
          confirmationCode: userDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

const resendCode = async (req, res, next) => {
  console.log("Entro en resend")
  console.log("body", req);
  try {
    //! vamos a configurar nodemailer porque tenemos que enviar un codigo
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    //! hay que ver que el usuario exista porque si no existe no tiene sentido hacer ninguna verificacion
    const userExists = await User.findOne({ email: req.body?.email });

    if (userExists) {
      const mailOptions = {
        from: email,
        to: req.body?.email,
        subject: "Confirmation code",
        text: `tu codigo es ${userExists.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(404).json({
            resend: false,
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return next(setError(500, error.message || "Error general send code"));
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------check new user ------------------------
//! -----------------------------------------------------------------------------


const checkNewUser = async (req, res, next) => {

  //tenemos que verificar que el email existe en el registro, el codigo de confirmacion, buscar el user en la base de datos a traves del email y comparo los codigos.
  /** hago un UpDate y cambio en el chek en el model a TRUE */

  //cuando lo lanzo, se actualiza la base de datos y me one el check en true

  /**Errores que me puedo encontrar
   * -el email no esta (404)
   * -el codigo no coincide
   * -falta el update
   */

  console.log("check funciona")
  try {
    //! nos traemos de la req.body el email y codigo de confirmation
    //
    const { email, confirmationCode } = req.body;

    //! hay que ver que el usuario exista porque si no existe no tiene sentido hacer ninguna verificacion
    const userExists = await User.findOne({ email });
    if (!userExists) {
      //!No existe----> 404 de no se encuentra
      return res.status(404).json('User not found');
    } else {
      // cogemos que comparamos que el codigo que recibimos por la req.body y el del userExists es igual
      if (confirmationCode === userExists.confirmationCode) {
				// si coinciden los codigos hacemos la actualizacion de check 
        try {
          await userExists.updateOne({ check: true }); //! es una query de Mongoose
          //? hago un testing para ver si se ha actualizdo la clave
          // hacemos un testeo de que este user se ha actualizado correctamente, hacemos un findOne
          const updateUser = await User.findOne({ email });

          // este finOne nos sirve para hacer un ternario que nos diga si la propiedad vale true o false
          return res.status(200).json({
          testCheckOk: updateUser.check == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json(error.message)
          
        }

        //? Cuando el codigo de confirmacion no son iguales, borro el usuario
      } else {
        /// En caso dec equivocarse con el codigo lo borramos de la base datos y lo mandamos al registro
        //?esta query borra el usuario a traves del ID y borra la foto de Cloudinary
        const deleteUser = await User.findByIdAndDelete(userExists._id);

        // borramos la imagen
        deleteImgCloudinary(userExists.image);
				// metemos 200 aunque no ha salido bien el controlador porque sino salta el error primero
				/// si le ponemos 404 salta el error de arriba de User not found aunque si lo ha borrado
        // devolvemos un 200 con el test de ver si el delete se ha hecho correctamente
        return res.status(200).json({
          userExists,
          check: false,
          delete: (await User.findById(userExists._id))//? lo busco para ver si se ha borrado bien
            ? 'error delete user'
            : 'ok delete user',
        });
      }
    }
  } catch (error) {
    // siempre en el catch devolvemos un 500 con el error general
    return next(setError(500, error.message || 'General error check code'));
  }
};
//! -----------------------------------------------------------------------------
//? ----------------------------LOGIN ------------------------
//! -----------------------------------------------------------------------------
// recibo email y password: veo q exista el user y si existe, que la contraseña coincida. Si esta OK, genero el TOken
const login = async (req, res, next) => {
  try {
		// nos traemos 
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
			// comparamos la contrase del body con la del user de la DB
      if (bcrypt.compareSync(password, userDB.password)) {
				// si coinciden generamos el token
        const token = generateToken(userDB._id, email);
				// mandamos la respuesta con el token
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json('password dont match');
      }
    } else {
      return res.status(404).json('User no register');
    }
  } catch (error) {
    return next(error.message);
  }
};
//! -----------------------------------------------------------------------------
//? ----------------------------AUTO LOGIN ------------------------
//! -----------------------------------------------------------------------------
const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if ((password == userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json('password dont match');
      }
    } else {
      return res.status(404).json('User no register');
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------CONTRASEÑA SIN LOGAR ------------------------
//! -----------------------------------------------------------------------------

/**
 * RECIBIMOS LOS DATOS DEL MAIL DEL USUARIO
 * COMPRUEBO QUE EXISTE Y GENERO UNA NUEVA CONTRASEÑA
 * ENCRYPTO LA CONTRASEÑA Y LA GUARDO EN LA DB
 * SE LA ENVIO AL MAIL DEL USUARIO
 */

// BASE_URL_COMPLETE = http://localhost:8080
/// -----> al meter la url al .env, si cambiamos de servidor de aplicaciones como a railway
///... es mas facil cambiar lac url base del proyecto
const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;
		// si el usuario existe entonces hacemos el redirect para 
    const userDb = await User.findOne({ email });
    if (userDb) {

			// recordar podemos poner el code 307 o 308 para que ambos controladores sean un post
        //---> tanto el que hace el redirect como el contralador al que se redirige

			//return res.redirect( 307,
      //  `${BASE_URL_COMPLETE}/api/v1/users/sendPassword/${userDb._id}`
	    // );


      return res.redirect(307,
        `http://localhost:${PORT}/api/v1/users/sendPassword/${userDb._id}`
      );
    } else {
      return res.status(404).json('User no register');
    }
  } catch (error) {
    return next(error)
  }
};



const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDb = await User.findById(id);
		// configuramos el transporte de nodemailer
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

		// Generamos la password secura con la funcion randomPassword 
    let passwordSecure = randomPassword();
    console.log(passwordSecure);
    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: '-----',
      text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
    };

		// enviamos el email
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
				// si hay error quiere decir que ni hemos actualizado el user, ni enviamos email
        console.log(error);
        return res.status(404).json('dont send email and dont update user');
      } else {
        console.log('Email sent: ' + info.response);
				// ----> si hemos enviado el correo, hasheamos la contraseña y actualizamos el user
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);
        try {
					// actualizamos la contraseña en el back: SIEMPRE QUE HAYA ACTUALIZACION, HAY QUE HACER UN TRY CATCH
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });
          const userUpdatePassword = await User.findById(id);
					/// comprobamos que se haya actualizado correctamente: HACEMOS UN TEST
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
          return res.status(200).json({
            updateUser: true,
            sendPassword: true,
          });
        } else {
					//// si no se ha actualizado damos feedback de que se envio la contraseña pero 
					// ... no se actualizo 
          return res.status(404).json({
            updateUser: false,
            sendPassword: true,
          });
        }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
}

//! -----------------------------------------------------------------------------
//? ----------------------------CCAMBIO DE CONTRASEA CUANDO NO ESTAS LOGADO ------
//! -----------------------------------------------------------------------------

const modifyPassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;

		// validamos la password para saber tiene el formato correcto

    const validado = validator.isStrongPassword(newPassword);
    if (validado) {
      const { _id } = req.user;

			// comparamos la contraseña antigua del body y la encriptada del back
      if (bcrypt.compareSync(password, req.user.password)) {

				// si se cumple hasheamos y guardamos
        const newPasswordHashed = bcrypt.hashSync(newPassword, 10);
        try {
          await User.findByIdAndUpdate(_id, { password: newPasswordHashed });
          const userUpdate = await User.findById(_id);
          if (bcrypt.compareSync(newPassword, userUpdate.password)) {
            return res.status(200).json({
              updateUser: true,
            });
          } else {
            return res.status(404).json({
              updateUser: false,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("password not valid");
    }
  } catch (error) {
    return next(error);
  }
};


module.exports = {
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
  modifyPassword
};

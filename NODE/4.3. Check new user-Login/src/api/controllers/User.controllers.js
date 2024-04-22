/**
 * Tenemos que requerirnos las diferentes librerrias que vayamos a utilizar:
 * - para enviar el mail---> nodemailer
 * - para validar datos como el correo ---> validator
 * - para encriptar contraseñas -->bcrypt
 * - para trabajar con .env --> dotenv y configurarlo
 * 
 * Vamos a hacer un CRUD --> crear, leer, actualizar y borrar
 * las funciones seran asincronas porque interatuan con el backend y la DB
 * Cmo los controladores consumen modelos, tenemos que importar le modelo
 * 
 * El frontal simulado que usamos es INSOMNIA
 */

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
const User = require("../models/User.model")

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
 //un controlador siempre tiene req, res y next en el mismo orden
const registerLargo = async (req, res, next) => { //!por cada asyncronia, hago un try catch
  console.log("Entro en LARGO")
  // capturamos la imagen nueva subida a cloudinary: viene de la parte del path que es el file
  let catchImg = req.file?.path;
  try {
    // actualizamos los elementos unique del modelo porque estoy actualizando y cambio datos en la DB: los indexes
    console.log("entro en try register")
    await User.syncIndexes(); //primero modelo (en mayusculas), y después el método

    const { email, name } = req.body; // lo que enviamos por la parte del body de la request

    // vamos a buscar al usuario a través de sus datos unicos
    const userExist = await User.findOne({ email: req.body.email },{ name: req.body.name });

    if (!userExist) { // sino existe, te registro
      let confirmationCode = randomCode(); //generamos el codigo de confirmacion y se lo añadimos al nuevo usuario
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) { //confirmamos si hay o no imagen y sino la asignamos por defecto
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try { // guardamos el usuario
        const userSave = await newUser.save();
        if (userSave) { // si esta guardado, mandamos un mail con transporter
          // ---------------------------> ENVIAR EL CODIGO CON NODEMAILER --------------------
          const emailEnv = process.env.EMAIL;
          const password = process.env.PASSWORD;

          const transporter = nodemailer.createTransport({ // hacemos una autenticacion con gmail con los parametros que le pasamos
            service: "gmail",
            auth: {
              user: emailEnv,
              pass: password,
            },
          });

          const mailOptions = { // le doy los parametros que quiero que tenga la carta
            from: emailEnv,
            to: email,
            subject: "Confirmation code",
            text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
          };

          transporter.sendMail(mailOptions, function (error, info) { // le decimos a transporter que mande la carta
            if (error) { // si no se manda, lanzo error
              console.log(error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            } // si se manda, lanzo un 200
            console.log("Email sent: " + info.response);
            return res.status(200).json({
              user: userSave,
              confirmationCode,
            });
          });
        } else { // si no se guarda, lanzamos el error
          return res.status(404).json("error save user");
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else { // si el usuario existe, borramos la imagen y decimos que ya existe
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
  let catchImg = req.file?.path; // capturamos la imagen
  try {
    await User.syncIndexes();// sincronizamos los indexes

    const { email, name } = req.body; // hacemos el destructuring del body

    const userExist = await User.findOne( // buscamos en el modelo por elementos unicos body y email
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) { // comprobamos si existe o no el usuario en la DB
      let confirmationCode = randomCode(); // si no existe, le asignamos un codigo de confirmacion haciendo una copia del req.body
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) { // si sube imagen se la asigno, ino le doy una por defecto
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try { // si el usuario no existe y lo vamos a crear, tenemos que comprobar que se haya guardado
        const userSave = await newUser.save();

        if (userSave) { // si esta guardado, enviamos el email
          sendEmail(email, name, confirmationCode);
          setTimeout(() => { //hacemos una cuenta atras para gestionar el envio del correo ya que es algo asincrono. En este tiempo evaluo el estado del envio
            if (getTestEmailSend()) {// si el envio es true, mandamos un 200
              // el estado ya utilizado lo reinicializo a false
              setTestEmailSend(false);
              return res.status(200).json({
                user: userSave,
                confirmationCode,
              });
            } else {// si no se ha enviado el mail mandamos el 404
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
          // si hay usuario hacemos el redirech a otra ruta: a sendemail
          return res.redirect(
            303,
            `http://localhost:8080/api/v1/users/register/sendMail/${userSave._id}` // en la ruta puedo poner el localhos o un template string con la variable PORT, por si es distinto a 8080
          ); // el id lo genera la base de datos
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
    // nos traemos el id de los params: los params es la ruta en este caso :id
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
		// nos traemos (password encriptada en DB)
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });// BUSCAMOS EN LA DB POR EMAIL

    if (userDB) {// si existe..
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

// es igual que el login, solo que ahora compara dos contraseñas encriptadas y no hace falta el comparesync.
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

// *****SIEMPRE QUE HAGA UN LOGIN TENGO QUE CAMIR EL TOKEN EN LAS VARIABLES DE ENTORNO DE INSOMNIA******///

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
        `http://localhost:8080/api/v1/users/sendPassword/${userDb._id}`
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
    const { id } = req.params; // LE ENVIAMOS EL ID EN LA RUTA, para poder buscarlo en la DB
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

		// Generamos la password secura con la funcion randomPassword : esta funcion esta en utils
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
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {// en el sitio de la contraseña, me pones la nueva encriptada
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

//! -----------------------------------------------------------------------------
//? ----------------------------UPDATE -----------------------------------------
//! -----------------------------------------------------------------------------

const update = async (req, res, next) => {
	// guardamos la imagen para si luego hay un error utilizar la URL para borrarla
  let catchImg = req.file?.path; // vamos a tener 2 middleware : autenticacion y ficheros
  try {
		// creamos una nueva instancia del modelo User con el req.body
    const patchUser = new User(req.body);
		// si tiene archivo la request entonces le metemos al usuario creado esa imagen
    if (req.file) { //! la imagen no esta en el body, esta en re.file (middleware)
      patchUser.image = req.file.path;
    } //!elementos que no deben cambiar
		// importante quedarnos con el id del usuario antes de actualizarse
    patchUser._id = req.user._id;
		// LA CONTRASEÑA NO SE PUEDE MODIFICAR: ponemos la contraseña de la db
    patchUser.password = req.user.password;
		// Lo mismo con el rol, confirmationCode, check, NO SE PUEDE MODIFICAR POR AQUI
    patchUser.rol = req.user.rol;
		patchUser.confirmationCode = req.user.confirmationCode
		patchUser.check = req.user.check
		patchUser.email = req.user.email;
    patchUser.gender= req.user.gender;
		
		// Ahora cogemos y actualizamos el usuario 
    
    try {
      await User.findByIdAndUpdate(req.user._id, patchUser);// le paso el patchUser para que pueda cambiarlo
      if (req.file) {
        deleteImgCloudinary(req.user.image);
      }
      const updateUser = await User.findById(req.user._id); //req.user es el usuario antes de modificarlo
			// nos traemos del objeto del body sus claves: que cosas me ha pedido que cambie
      const updateKeys = Object.keys(req.body);
			/// -----> venerar un array con los resultados del test en el runtime
      const testUpdate = []; //! en este objeto vacio meto el test

			// recorremos el objeto con las claves y comprobamos si los valores del back coinciden
      updateKeys.forEach((item) => {
				// si coinciden pushamos un objeto con el nombre del item y un true
        if (updateUser[item] == req.body[item]) { //!si son iguales, se han actualizado
          if (updateUser[item] != req.user[item]) { //!si es distinto a la primera, la actualizo con la nueva
            testUpdate.push({
              [item]: true,
            });
          } else {
						// metemos sameOldInfo porque es igual a la info original no hay cambios  //!si no se ha cambiado, pongo que es lo mismo
            testUpdate.push({
              [item]: "sameOldInfo",
            });
          }
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

			//// lo mismo que arriba pero ahora con el req.file en caso de haberlo recibido
      if (req.file) {
        updateUser.image == req.file.path //! es el que compara la URL
          ? testUpdate.push({
              file: true,
            })
          : testUpdate.push({
              file: false,
            });
      }
      return res.status(200).json({
        testUpdate,
        updateUser
      });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
		// siempre que tengamos un error debemos borrar la imagen nueva subida a cloudinary
    if (req.file) {
      deleteImgCloudinary(catchImg);
    }
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------DELETE -----------------------------------------
//! -----------------------------------------------------------------------------

const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    await User.findByIdAndDelete(_id); // aqui lo borro y luego hago un test para ver si lo he borrado
    if (await User.findById(_id)) { // busca el usuario y si lo encuentra, no está borrado
      return res.status(404).json('"not deleted');
    } else {

      // hay que borrar todo lo que haya hecho el usuario
      deleteImgCloudinary(image);
      return res.status(200).json('ok delete');
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------findById------------------------------------
//! -----------------------------------------------------------------------------

const byId = async (req, res, next) => {
  try {
    const userById = await User.findById(req.params.id); // si no lo encuentra es un null
    if (userById) {
      return res.status(200).json(userById);
    } else {
      return res.status(404).json("usuario no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------getAll--------------------------------------
//! -----------------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const getAllUser = await User.find(); // esto devuelve un array
    if (getAll.length === 0) {
      return res.status(404).json("no encontrados");
    } else return res.status(200).json({ data: getAllUser });
  } catch (error) {
    return next(error);
  }
};
//! -----------------------------------------------------------------------------
//? ---------------------------------get By name---------------------------------
//! -----------------------------------------------------------------------------

const byName = async (req, res, next) => {
  try {
    const getNameUser = await User.findOne({ name: req.params.name });
    if (getNameUser) {
      return res.status(200).json(getNameUser);
    } else {
      return res.status(404).json("usuario no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ---------------------------------get By Gender---------------------------------
//! -----------------------------------------------------------------------------

const byGender = async (req, res, next) => {
  try {
    const getGenderUser = await User.find({
      gender: req.params.gender,
      name: req.params.name,
    });
    if (getGenderUser) {
      return res.status(200).json(getGenderUser);
    } else {
      return res.status(404).json("usuario no encontrado");
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
  modifyPassword,
  update,
  deleteUser,
  getAll,
  byId,
  byName,
  byGender,
};

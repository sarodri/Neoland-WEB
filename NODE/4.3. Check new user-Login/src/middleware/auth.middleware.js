// archivo en middleware --> auth.middleware.js
const User = require('../api/models/User.model');
const { verifyToken } = require('../utils/token');
const dotenv = require('dotenv');
dotenv.config();

const isAuth = async (req, res, next) => {

	// como es un token de tipo bearer le quitamos el prefijo para poder utlizarlo
  const token = req.headers.authorization?.replace('Bearer ', '');
	// si no hay token  le lanzamos un error 
  if (!token) {
    return next(new Error('Unauthorized'));
  }

  try {

		// vamos a decodificar el token para sacar el id , hay una req.user que viene de la autenticacion
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);//! me traigo el usuario y traigo y guardo en la req.user todos los datos del usuario

		// si todo esta bien continuamos
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return next(new Error('Unauthorized'));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);


		//! -----> La unica diferencia es que comprobamos si es administrador
    if (req.user?.rol !== 'admin') {
      return next(new Error('Unauthorized, not admin'));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthSuper = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return next(new Error("Unauthorized"));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    // cuando decodifico el token saco el id y el email
    console.log(decoded);
    req.user = await User.findById(decoded.id);

    // pongo un requisito mas y es que sea admin
    if (req.user.rol !== "superadmin") {
      return next(new Error("Unauthorized, not superadmin"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuth,
  isAuthAdmin,
  isAuthSuper
};
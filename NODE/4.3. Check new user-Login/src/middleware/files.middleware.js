const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

//! todo esto viene en la documentacion de cloudinary

//Creamos el almacen: instancio una nueva clase, 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { // que nombre tiene el folder para hacer en cloudinary
    folder: "userProyect04FT",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
  },
});

//Creamos la función de subir imagenes: sube archivos a cloudinary usando el storage que hemos creado
const upload = multer({ storage });

//Función de borrado de imagenes
const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const nameSplited = imgSplited[imgSplited.length - 1].split(".");
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image delete in cloudinary");
  });
};

const configCloudinary = () => {
  cloudinary.config({// lo sacamos de .env, obteniendolo en el dashboard de cloudinary
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

module.exports = { upload, deleteImgCloudinary, configCloudinary };

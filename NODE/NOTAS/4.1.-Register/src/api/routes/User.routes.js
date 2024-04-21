const express = require("express");
const UserRoutes = express.Router();

const { registerLargo } = require("../controllers/User.controllers");
const { upload } = require("../../middleware/files.middleware");

//!------------------------------------------------------------------------
//?--------------------------------RUTAS SIN REDIRECT----------------------
//!------------------------------------------------------------------------

UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);

module.exports = UserRoutes;

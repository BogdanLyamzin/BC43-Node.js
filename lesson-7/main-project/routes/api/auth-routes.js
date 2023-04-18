const express = require("express");

const authController = require("../../controllers/auth-controllers");

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.userRegisterSchema), authController.register);

// signin
router.post("/login", validateBody(schemas.userLoginSchema), authController.login);

module.exports = router;
const express = require("express");

const authController = require("../../controllers/auth-controllers");

const {authenticate, upload} = require("../../middlewares")

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.userRegisterSchema), authController.register);

// signin
router.post("/login", validateBody(schemas.userLoginSchema), authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);

module.exports = router;
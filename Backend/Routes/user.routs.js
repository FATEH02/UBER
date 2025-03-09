const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller.js");
const authmiddleWare = require("../Middlewares/auth.middleware.js");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("first name atleat be 3 char long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 legth"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }),
  ],
  userController.loginUser
);

router.get("/profile", authmiddleWare.authUser, userController.getUserProfile);

router.get("/logout",authmiddleWare.authUser,userController.logoutUser)

module.exports = router;

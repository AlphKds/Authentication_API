const userController = require("../controllers/users.controller.js");

const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/user-profile", userController.userProfile);
// router.get("/users", userController.getUsers);

module.exports = router;

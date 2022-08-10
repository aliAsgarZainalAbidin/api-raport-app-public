const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth-controller");
const accountController = require("../controllers/account-controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);
//Butuh ResetPassword oleh ADMIN dan update password oleh Orang Tua

router
  .route("/")
  .get(authController.protect, accountController.getAllAccount)
  .post(authController.protect, accountController.createAccount);

router
  .route("/:id")
  .get(authController.protect, accountController.getAccount)
  .put(authController.protect, accountController.updateAccount)
  .delete(authController.protect, accountController.deleteAccount);

module.exports = router;

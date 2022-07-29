const express = require("express");
const router = express.Router();
const raportController = require("./../controllers/raport-controller");
const authController = require("./../controllers/auth-controller");

router.route("/").get(authController.protect, raportController.getAllRaport);

router
  .route("/detail")
  .get(authController.protect, raportController.getSpesificRaportSiswa);

router
  .route("/:id")
  .patch(authController.protect, raportController.updateRaportById);

module.exports = router;

const express = require("express");
const router = express.Router();
const raportController = require("./../controllers/raport-controller");
const authController = require("./../controllers/auth-controller");

router
  .route("/download-pdf")
  .get(authController.protect, raportController.raportPdf);

router
  .route("/")
  .get(authController.protect, raportController.getAllRaport)
  .put(authController.protect, raportController.updateRaportById);

router
  .route("/detail")
  .get(authController.protect, raportController.getSpesificRaportSiswa);

router
  .route("/:id")
  .patch(authController.protect, raportController.updateRaportById);

module.exports = router;

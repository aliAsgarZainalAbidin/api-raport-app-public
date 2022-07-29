const tugasController = require("./../controllers/tugas-controller");
const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth-controller");

router.route("/").post(authController.protect, tugasController.createTugas);

router
  .route("/:id")
  .get(authController.protect, tugasController.getTugasById)
  .patch(authController.protect, tugasController.updateTugasById)
  .delete(authController.protect, tugasController.deleteTugasById);

router
  .route("/raportId/:id")
  .get(authController.protect, tugasController.updateTugasInRaport);

module.exports = router;

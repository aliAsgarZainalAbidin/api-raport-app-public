const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth-controller");
const siswaController = require("./../controllers/siswa-controller");

router
  .route("/")
  .get(authController.protect, siswaController.getAllSiswa)
  .post(authController.protect, siswaController.createSiswa);

router
  .route("/:id")
  .delete(authController.protect, siswaController.deleteSiswa)
  .patch(authController.protect, siswaController.updateSiswa)
  .get(authController.protect, siswaController.getSiswa);

module.exports = router;

const express = require("express");
const router = express.Router();
const fs = require("fs");
const authController = require("./../controllers/auth-controller");
const siswaController = require("./../controllers/siswa-controller");

router.get("/file/:name", siswaController.sendImages);

router
  .route("/")
  .get(authController.protect, siswaController.getAllSiswa)
  .post(
    authController.protect,
    siswaController.uploadSiswaPhoto,
    siswaController.createSiswa
  );

router
  .route("/:id")
  .delete(authController.protect, siswaController.deleteSiswa)
  .patch(authController.protect, siswaController.updateSiswa)
  .get(authController.protect, siswaController.getSiswa);

module.exports = router;

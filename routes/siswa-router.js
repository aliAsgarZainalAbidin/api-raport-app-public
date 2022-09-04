const express = require("express");
const router = express.Router();
const fs = require("fs");
const authController = require("./../controllers/auth-controller");
const siswaController = require("./../controllers/siswa-controller");

router.get("/file/:name", siswaController.sendImages);
router.post(
  "/updatePhoto/:id",
  authController.protect,
  siswaController.uploadSiswaPhoto,
  siswaController.uploadPhoto
);

router
  .route("/")
  .get(authController.protect, siswaController.getAllSiswa)
  .post(
    authController.protect,
    siswaController.uploadSiswaPhoto,
    siswaController.createSiswa
  );

router
  .route("/nis/:id")
  .get(authController.protect, siswaController.getSiswaByNis);

router
  .route("/:id")
  .delete(authController.protect, siswaController.deleteSiswa)
  .put(authController.protect, siswaController.updateSiswa)
  .get(authController.protect, siswaController.getSiswa);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth-controller");
const classController = require("./../controllers/class-controller");

router
  .route("/guru/:id")
  .get(authController.protect, classController.getClassByGuruId);

router
  .route("/siswa/:id")
  .get(authController.protect, classController.getClassByNisSiswa);

router
  .route("/")
  .get(authController.protect, classController.getAllClass)
  .post(authController.protect, classController.createClass);

router
  .route("/:id")
  .delete(authController.protect, classController.deleteClass)
  .put(authController.protect, classController.updateClass)
  .get(authController.protect, classController.getClassById);

module.exports = router;

const express = require("express");

const router = express.Router();
const authController = require("./../controllers/auth-controller");
const mapelController = require("./../controllers/mapel-controller");

router
  .route("/")
  .get(authController.protect, mapelController.getAllMapel)
  .post(authController.protect, mapelController.create);

router
  .route("/:id")
  .get(authController.protect, mapelController.getMapelById)
  .patch(authController.protect, mapelController.updateById)
  .delete(authController.protect, mapelController.deleteMapelById);

module.exports = router;

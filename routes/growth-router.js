const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth-controller");
const growthController = require("./../controllers/growth-controller");

router
  .route("/")
  .patch(authController.protect, growthController.addGrowthInPesan);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth-controller");
const pesanController = require("./../controllers/pesan-controller");

router.route("/").get(authController.protect, pesanController.getPesanSiswa);

module.exports = router;

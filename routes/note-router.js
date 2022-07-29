const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const noteController = require("../controllers/note-controller");

router.route("/").patch(authController.protect, noteController.addNoteInPesan);

module.exports = router;

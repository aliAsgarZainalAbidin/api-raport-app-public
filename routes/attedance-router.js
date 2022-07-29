const express = require("express");

const router = express.Router();
const authController = require("./../controllers/auth-controller");
const attendanceController = require("./../controllers/attendance-controller");

router
  .route("/")
  .post(authController.protect, attendanceController.createNewAttendance)
  .get(authController.protect, attendanceController.getAttendance);

router
  .route("/:id")
  .get(authController.protect, attendanceController.getAttendanceById)
  .patch(authController.protect, attendanceController.updateAttendanceById);

module.exports = router;

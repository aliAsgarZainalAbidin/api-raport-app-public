const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Attendance = require("./../models/AbsenModel");
const Class = require("./../models/ClassModule");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createNewAttendance = catchAsync(async (req, res, next) => {
  const kelas = await Class.findById(req.body.classId);

  let newSiswaId = [];
  kelas.siswaId.forEach(parseObjectIdtoString);

  function parseObjectIdtoString(item) {
    const siswa = {
      siswaId: item.toString(),
      kehadiran: "Tanpa Keterangan",
    };
    newSiswaId.push(siswa);
  }

  req.body.attendance = newSiswaId;
  const attendance = await Attendance.create(req.body);

  res.status(201).json({
    status: "Success",
    data: attendance,
  });
});

exports.getAttendance = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.aggregate([
    {
      $match: {
        classId: ObjectId(req.query.classId),
        mapelId: ObjectId(req.query.mapelId),
      },
    },
    {
      $lookup: {
        from: "siswas",
        localField: "attendance.siswaId",
        foreignField: "_id",
        as: "detailSiswa",
      },
    },
  ]);

  res.status(200).json({
    status: "Success",
    results: attendance.length,
    data: attendance,
  });
});

exports.getAttendanceById = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.findById(req.params.id);

  if (!attendance) {
    return next(new AppError("Attendance with that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: attendance,
  });
});

exports.getAttendanceBySiswaId = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.find({
    mapelId: ObjectId(req.query.mapelId),
    "attendance.siswaId": ObjectId(req.query.siswaId),
  });

  // let newAttendance = [];
  // attendance.forEach(parseObjectIdtoString);

  // function parseObjectIdtoString(item) {
  //   item.attendance.forEach(selectMatchSiswaId);
  //   // newAttendance.push(siswa);
  // }

  // function selectMatchSiswaId(item) {
  //   // console.log(`${ObjectId(item.siswaId)} ITEM`);
  //   // console.log(req.query.siswaId);
  //   if (ObjectId(item.siswaId) == req.query.siswaId) {
  //     // console.log(item.siswaId);
  //     newAttendance.push(item);
  //   }
  // }

  // const finalAttendance = {
  //   tanggalAbsen: attendance.tanggalAbsen,
  //   attendance: newAttendance,
  // };

  if (!attendance) {
    return next(new AppError("Attendance with that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: attendance,
  });
});

exports.updateAttendanceById = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!attendance) {
    return next(new AppError("Attendance with that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: attendance,
  });
});

const catchAsync = require("./../utils/catchAsync");
const Raport = require("./../models/RaportModel");
const AppError = require("./../utils/appError");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getAllRaport = catchAsync(async (req, res, next) => {
  const raport = await Raport.aggregate([
    {
      $match: {
        classId: ObjectId(req.query.classId),
      },
    },
  ]);

  if (!raport) {
    return next(new AppError("Raport with that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: raport,
  });
});

exports.getSpesificRaportSiswa = catchAsync(async (req, res, next) => {
  const raport = await Raport.aggregate([
    {
      $match: {
        classId: ObjectId(req.query.classId),
        mapelId: ObjectId(req.query.mapelId),
        siswaId: ObjectId(req.query.siswaId),
      },
    },
    {
      $unwind: "$mapelId",
    },
    {
      $lookup: {
        from: "tugas",
        localField: "tugasId",
        foreignField: "_id",
        as: "tugasDetail",
      },
    },
    {
      $unset: ["tugasId"],
    },
  ]);

  if (!raport) {
    return next(new AppError("Raport With that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: raport[0],
  });
});

exports.updateRaportById = catchAsync(async (req, res, next) => {
  const raport = await Raport.aggregate([
    {
      $match: {
        classId: ObjectId(req.body.classId),
        mapelId: ObjectId(req.body.mapelId),
        siswaId: ObjectId(req.body.siswaId),
      },
    },
    {
      $unwind: "$classId",
    },
  ]);

  if (!raport) {
    return next(new AppError("Raport With that ID not found!", 404));
  }

  const updatedRaport = await Raport.findByIdAndUpdate(
    raport[0]._id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  console.log(updatedRaport);

  res.status(200).json({
    status: "Success",
    data: updatedRaport,
  });
});

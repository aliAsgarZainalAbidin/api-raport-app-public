const Pesan = require("./../models/PesanModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getPesanSiswa = catchAsync(async (req, res, next) => {
  let pesan = await Pesan.aggregate([
    {
      $match: {
        siswaId: ObjectId(req.query.siswaId),
      },
    },
    {
      $lookup: {
        from: "growths",
        localField: "growthId",
        foreignField: "_id",
        as: "growthDetail",
      },
    },
    {
      $lookup: {
        from: "notes",
        localField: "noteId",
        foreignField: "_id",
        as: "noteDetail",
      },
    },
  ]);

  if (pesan.length == 0) {
    pesan = await Pesan.create({
      siswaId: req.query.siswaId,
      growthId: [],
      noteId: [],
    });

    res.status(201).json({
      status: "Success",
      data: pesan,
    });
  }

  res.status(200).json({
    status: "Success",
    data: pesan[0],
  });
});

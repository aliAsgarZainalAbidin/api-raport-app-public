const AppError = require("./../utils/appError");
const Class = require("./../models/ClassModule");
const catchAsync = require("./../utils/catchAsync");
const mongoose = require("mongoose");
const ApiFeatures = require("../utils/apiFeatures");
const ObjectId = mongoose.Types.ObjectId;

exports.deleteClass = catchAsync(async (req, res, next) => {
  const kelas = await Class.findByIdAndDelete(req.params.id);

  if (!kelas) {
    return next(new AppError("Kelas with that ID not found!", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

exports.updateClass = catchAsync(async (req, res, next) => {
  const kelas = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!kelas) {
    return next(new AppError("Kelas with that ID not Found", 404));
  }

  console.log(kelas);

  res.status(200).json({
    status: "Success",
    data: kelas,
  });
});

exports.getAllClass = catchAsync(async (req, res) => {
  const features = new ApiFeatures(Class.find(), req.query)
    .filters()
    .limitFields();
  let kelas = await features.query;

  res.status(200).json({
    status: "Success",
    data: kelas,
  });
});

exports.getClassByGuruId = catchAsync(async (req, res, next) => {
  const kelas = await Class.aggregate([
    {
      $match: { guruKelas: ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: "mapels",
        localField: "mapelId",
        foreignField: "_id",
        as: "mapelDetail",
      },
    },
    {
      $lookup: {
        from: "siswas",
        localField: "siswaId",
        foreignField: "_id",
        as: "siswaDetail",
      },
    },
    {
      $unset: ["mapelId", "__v"],
    },
  ]);

  if (!kelas[0]) {
    return next(new AppError("Class with that Guru ID not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: kelas[0],
  });
});

exports.getClassByNisSiswa = catchAsync(async (req, res) => {
  let kelas = await Class.aggregate([
    {
      $lookup: {
        from: "siswas",
        localField: "siswaId",
        foreignField: "_id",
        as: "detailSiswa",
      },
    },
    {
      $lookup: {
        from: "mapels",
        localField: "mapelId",
        foreignField: "_id",
        as: "mapelDetail",
      },
    },
  ]);

  kelas.forEach((item) => {
    item.detailSiswa.forEach((detail) => {
      if (detail.nis === req.params.id) {
        // console.log(detail);
        kelas = item;
      }
    });
  });

  if (!kelas) {
    next(new AppError("Class with that NIS not Found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: kelas,
  });
});

exports.createClass = catchAsync(async (req, res) => {
  const newClass = await Class.create(req.body);

  res.status(201).json({
    status: "Success",
    data: newClass,
  });
});

exports.getClassById = catchAsync(async (req, res) => {
  const kelas = await Class.aggregate([
    {
      $match: {
        _id: ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "siswas",
        localField: "siswaId",
        foreignField: "_id",
        as: "siswaDetail",
      },
    },
    {
      $lookup: {
        from: "mapels",
        localField: "mapelId",
        foreignField: "_id",
        as: "mapelDetail",
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "guruKelas",
        foreignField: "_id",
        as: "detailGuru",
      },
    },
    {
      $unset: [
        "siswaId",
        "__0",
        "siswaDetail.tempatLahir",
        "siswaDetail.tanggalLahir",
        "siswaDetail.address",
        "siswaDetail.namaAyah",
        "siswaDetail.namaIbu",
        "mapelId",
        "guruKelas",
      ],
    },
  ]);

  res.status(200).json({
    status: "Success",
    data: kelas,
  });
});

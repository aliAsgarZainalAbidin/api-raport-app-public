const Raport = require("./../models/RaportModel");
const Tugas = require("./../models/TugasModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.createTugas = catchAsync(async (req, res, next) => {
  const tugas = await Tugas.create(req.body);
  await Raport.updateOne(
    { _id: req.body.raportId.toString() },
    { $push: { tugasId: tugas._id } }
  );
  const raport = await Raport.findById(req.body.raportId);

  res.status(200).json({
    status: "Success",
    data: raport,
  });
});

exports.updateTugasInRaport = catchAsync(async (req, res, next) => {
  const raport = await Raport.findById(req.params.id);

  console.log(raport);
});

exports.getTugasById = catchAsync(async (req, res, next) => {
  const tugas = await Tugas.findById(req.params.id);

  if (!tugas) {
    return next(new AppError("Tugas with that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: tugas,
  });
});

exports.updateTugasById = catchAsync(async (req, res, next) => {
  const newTugas = await Tugas.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!newTugas) {
    return next(new AppError("Tugas with that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: newTugas,
  });
});

exports.deleteTugasById = catchAsync(async (req, res, next) => {
  const deletedTugas = await Tugas.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

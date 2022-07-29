const AppError = require("../utils/appError");
const Siswa = require("./../models/SiswaModel");
const catchAsync = require("./../utils/catchAsync");
const Raport = require("./../models/RaportModel");
const classController = require("./../controllers/class-controller");
const Class = require("../models/ClassModule");
const Pesan = require("./../models/PesanModel");

exports.deleteSiswa = catchAsync(async (req, res) => {
  const siswa = await Siswa.findByIdAndDelete(req.params.id);

  if (!siswa) {
    return next(new AppError("Siswa with that ID not Found", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

exports.updateSiswa = catchAsync(async (req, res, next) => {
  const siswa = await Siswa.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!siswa) {
    return next(new AppError("Siswa with that ID not Found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: siswa,
  });
});

exports.getAllSiswa = catchAsync(async (req, res) => {
  const siswa = await Siswa.find();

  res.status(200).json({
    status: "Success",
    data: siswa,
  });
});

exports.createSiswa = catchAsync(async (req, res) => {
  const siswa = await Siswa.create(req.body);
  const classDetail = await Class.findById(req.body.classId);
  const listBody = [];

  classDetail.mapelId.forEach(addRaport);

  async function addRaport(item) {
    const body = {
      classId: req.body.classId,
      mapelId: item,
      siswaId: siswa._id.toString(),
    };

    await Raport.create(body);
  }
  const initPesanSiswa = {
    siswaId: siswa._id.toString(),
    growthId: [],
    noteId: [],
  };
  await Pesan.create(initPesanSiswa);

  res.status(201).json({
    status: "Success",
    data: siswa,
  });
});

exports.getSiswa = catchAsync(async (req, res) => {
  const siswa = await Siswa.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    data: siswa,
  });
});

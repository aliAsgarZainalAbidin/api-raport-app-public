const AppError = require("../utils/appError");
const Siswa = require("./../models/SiswaModel");
const catchAsync = require("./../utils/catchAsync");
const Raport = require("./../models/RaportModel");
const classController = require("./../controllers/class-controller");
const Class = require("../models/ClassModule");
const Pesan = require("./../models/PesanModel");
const path = require("node:path");
const multer = require("multer");

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

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/img/siswa`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `siswa-${req.body.nis}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadSiswaPhoto = upload.single("photo");

exports.createSiswa = catchAsync(async (req, res) => {
  if (req.file) req.body.photo = req.file.filename;

  const siswa = await Siswa.create(req.body);
  console.log(req.file);
  console.log(req.body);

  res.status(201).json({
    status: "Success",
    data: siswa,
  });
});

exports.sendImages = catchAsync(async (req, res, next) => {
  var options = {
    root: path.join(__dirname, "../public/img/siswa"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  var filename = req.params.name;
  res.sendFile(filename, options, (err) => {
    if (err) {
      console.log(err);
      next(new AppError("Image not Found!", 404));
    } else {
      console.log("sent : ", filename);
    }
  });
});

// const classDetail = await Class.findById(req.body.classId);

// classDetail.mapelId.forEach(addRaport);

// async function addRaport(item) {
//   const body = {
//     classId: req.body.classId,
//     mapelId: item,
//     siswaId: siswa._id.toString(),
//   };

//   await Raport.create(body);
// }
// const initPesanSiswa = {
//   siswaId: siswa._id.toString(),
//   growthId: [],
//   noteId: [],
// };
// await Pesan.create(initPesanSiswa);

exports.getSiswa = catchAsync(async (req, res) => {
  const siswa = await Siswa.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    data: siswa,
  });
});

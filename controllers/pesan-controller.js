const Pesan = require("./../models/PesanModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getPesanSiswa = catchAsync(async (req, res, next) => {
  const pesan = await Pesan.findOne({ siswaId: req.query.siswaId });

  if (!pesan) {
    return next(new AppError("Pesan with that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: pesan,
  });
});

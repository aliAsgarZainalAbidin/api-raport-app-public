const Growth = require("./../models/GrowthModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Pesan = require("./../models/PesanModel");

exports.addGrowthInPesan = catchAsync(async (req, res, next) => {
  const growth = await Growth.create(req.body);
  await Pesan.updateOne(
    { _id: req.body.pesanId.toString() },
    { $push: { growthId: growth._id } }
  );

  const pesan = await Pesan.findById(req.body.pesanId);
  res.status(200).json({
    status: "Success",
    data: pesan,
  });
});

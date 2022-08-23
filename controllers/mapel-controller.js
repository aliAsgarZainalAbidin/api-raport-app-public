const Mapel = require("./../models/MapelModel");
const AppError = require("./../utils/appError");
const Class = require("./../models/ClassModule");
const catchAsync = require("./../utils/catchAsync");

exports.create = catchAsync(async (req, res) => {
  const mapel = await Mapel.create(req.body);

  res.status(201).json({
    status: "Success",
    data: mapel,
  });
});

exports.deleteMapelById = catchAsync(async (req, res, next) => {
  const mapel = await Mapel.findByIdAndDelete(req.params.id);
  await Class.updateMany(
    {
      $mapelId: {
        $elemMatch: { $eq: req.params.id },
      },
    },
    {
      $pull: { mapelId: ObjectId(req.params.id) },
    }
  );

  if (!mapel) {
    return next(new AppError("Mapel with that ID not found!"));
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

exports.getMapelById = catchAsync(async (req, res, next) => {
  const mapel = await Mapel.findById(req.params.id);

  if (!mapel) {
    return next(new AppError("Mapel with that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: mapel,
  });
});

exports.getAllMapel = catchAsync(async (req, res) => {
  const mapel = await Mapel.find();

  res.status(200).json({
    status: "Success",
    data: mapel,
  });
});

exports.updateById = catchAsync(async (req, res, next) => {
  const mapel = await Mapel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!mapel) {
    return next(new AppError("Mapel with that ID not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    data: mapel,
  });
});

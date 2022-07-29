const Account = require("../models/AccountModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const promisify = require("util");
const ApiFeatures = require("../utils/apiFeatures");

exports.updateAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!account) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: account,
  });
});

exports.getAllAccount = catchAsync(async (req, res) => {
  // const account = await Account.aggregate([
  //   {
  //     $lookup: {
  //       from: "classes",
  //       localField: "classId",
  //       foreignField: "_id",
  //       as: "classDetail",
  //     },
  //   },
  //   { $unwind: "$classDetail" },
  //   {
  //     $unset: [
  //       "classId",
  //       "classDetail.siswaId",
  //       "classDetail.mapelId",
  //       "classDetail.__v",
  //     ],
  //   },
  // ]);

  const features = new ApiFeatures(Account.find(), req.query)
    .filters()
    .limitFields();
  const account = await features.query;

  res.status(200).json({
    status: "Success",
    result: account.length,
    data: account,
  });
});

// exports.getAllRoleGuru = catchAsync(async (req, res, next) => {
//   let query = { role: "Guru" };
//   const account = await Account.find(query);

//   res.status(200).json({
//     status: "Success",
//     results: account.length,
//     data: account,
//   });
// });

exports.createAccount = catchAsync(async (req, res, next) => {
  const newAccount = await Account.create(req.body);

  res.status(201).json({
    status: "Success",
    data: newAccount,
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findByIdAndDelete(req.params.id);

  if (!account) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findById(req.params.id);
  if (!account) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: account,
  });
});

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const Account = require("../models/AccountModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError.js");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (account, statusCode, res) => {
  const token = signToken(account._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  account.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: account,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newAccount = await Account.create(req.body);
  createSendToken(newAccount, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return new AppError("Please Provide email and password!", 400);
  }

  const account = await Account.findOne({ username: username }).select(
    "+password"
  );

  if (
    !account ||
    !(await account.correctPassword(password, account.password))
  ) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(account, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const account = await Account.findOne({ id: req.account.id }).select(
    "password"
  );

  if (
    !(await account.correctPassword(req.body.passwordCurrent, account.password))
  ) {
    return next(new AppError("Your current password is wrong", 401));
  }

  account.password = req.body.password;
  account.passwordConfirm = req.body.passwordConfirm;
  await account.save();

  createSendToken(account, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshAccount = await Account.findById(decoded.id);

  if (!freshAccount) {
    return next(
      new AppError("The User belonging to this token does no longer", 401)
    );
  }

  req.account = freshAccount;
  next();
});

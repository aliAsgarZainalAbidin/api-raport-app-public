const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama wajib diisi"],
    trim: true,
    maxlength: [40, "Nama tidak boleh lebih dari 40 karakter"],
    // validate: [validator.isAplha, "Nama hanya diisi dengan karakter"],
  },
  username: {
    type: String,
    required: [true, "Username Wajib diisi"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password Wajib diisi"],
    trim: true,
    minlength: [6, "Password tidak boleh kurang dari 6 karakter"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "PasswordConfirm tidak boleh kosong"],
    trim: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password tidak sama",
    },
  },
  role: {
    type: String,
    required: [true, "Role Wajib Diisi"],
    enum: ["Admin", "OrangTua", "Guru"],
    default: "OrangTua",
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  phone: {
    type: String,
    trim: true,
  },
  classId: {
    type: mongoose.Schema.ObjectId,
    ref: "Class",
    trim: true,
  },
});

accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

accountSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});

accountSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

const mongoose = require("mongoose");
const validator = require("validator");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Nama Kelas wajib diisi"],
    unique: [true, "Nama Kelas telah digunakan"],
  },
  semester: {
    type: String,
    trim: true,
    required: [true, "Semester wajib diisi"],
  },
  tahunAjaran: {
    type: String,
    trim: true,
    required: [true, "Tahun Ajawan wajib diisi"],
  },
  guruKelas: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
    validate: {
      validator: function (el) {
        let Account = mongoose.model("Account");
        Account.findOne({ _id: el });
      },
    },
  },
  siswaId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Siswa",
    },
  ],
  mapelId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Mapel",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;

const mongoose = require("mongoose");
const validator = require("validator");

const mapelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama Mata Pelajaran wajib diisi"],
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: [true, "Kategori wajib diisi"],
    trim: true,
    enum: {
      values: ["Umum", "Khusus", "Penunjang"],
      message: "Kategori wajib salah satu dari : Umum, Khusus, Penunjang",
    },
    default: "Umum",
  },
});

const Mapel = mongoose.model("Mapel", mapelSchema);

module.exports = Mapel;

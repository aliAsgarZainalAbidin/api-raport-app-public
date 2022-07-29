const mongoose = require("mongoose");

const tugasSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Nama Tugas wajib diisi"],
    trim: true,
    maxlength: [40, "Nama tugas tidak boleh lebih dari 40 karakter"],
  },
  nilai: {
    type: Number,
    trim: true,
  },
});

const Tugas = mongoose.model("Tugas", tugasSchema);

module.exports = Tugas;

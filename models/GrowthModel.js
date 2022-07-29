const mongoose = require("mongoose");

const growthSchema = new mongoose.Schema({
  pesanId: {
    type: mongoose.Schema.ObjectId,
    ref: "Pesan",
  },
  tanggal: {
    type: String,
    trim: true,
    required: [true, "Tanggal wajib diisi"],
  },
  tinggi: {
    type: Number,
    trim: true,
    required: [true, "Tinggi wajib diisi"],
  },
  berat: {
    type: Number,
    trim: true,
    required: [true, "Berat wajib diisi"],
  },
  bmi: {
    type: Number,
    trim: true,
    required: [true, "BMI wajib diisi"],
  },
  ket: {
    type: String,
    trim: true,
  },
});

growthSchema.index({ pesanId: 1, tanggal: 1 }, { unique: true });

const Growth = mongoose.model("Growth", growthSchema);

module.exports = Growth;

const mongoose = require("mongoose");

const raportSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.ObjectId,
    ref: "Class",
    required: [true, "Class ID wajib diisi"],
  },
  mapelId: {
    type: mongoose.Schema.ObjectId,
    ref: "Mapel",
    required: [true, "Mapel ID wajib diisi"],
  },
  siswaId: {
    type: mongoose.Schema.ObjectId,
    ref: "Siswa",
    required: [true, "Siswa ID wajib diisi"],
  },
  tugasId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tugas",
    },
  ],
  nilaiSikap: {
    type: Number,
    min: [0, `{VALUE} tidak boleh lebih kecil dari pada 0`],
    max: [100, `{VALUE} tidak boleh lebih besar dari pada 100`],
  },
  nilaiUTS: {
    type: Number,
    min: [0, `{VALUE} tidak boleh lebih kecil dari pada 0`],
    max: [100, `{VALUE} tidak boleh lebih besar dari pada 100`],
  },
  nilaiUAS: {
    type: Number,
    min: [0, `{VALUE} tidak boleh lebih kecil dari pada 0`],
    max: [100, `{VALUE} tidak boleh lebih besar dari pada 100`],
  },
  deskripsi: {
    type: String,
    trim: true,
  },
});

raportSchema.index({ classId: 1, mapelId: 1, siswaId: 1 }, { unique: true });

const Raport = mongoose.model("Raport", raportSchema);

module.exports = Raport;

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  pesanId: {
    type: mongoose.Schema.ObjectId,
    ref: "Pesan",
  },
  tanggal: {
    type: String,
    trim: true,
    required: [true, "Tanggal wajib diisi"],
  },
  keterangan: {
    type: String,
    trim: true,
    required: [true, "Keterangan wajib diisi"],
  },
});

noteSchema.index({ pesanId: 1, tanggal: 1 }, { unique: true });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

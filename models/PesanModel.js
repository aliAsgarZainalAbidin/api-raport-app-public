const mongoose = require("mongoose");

const pesanSchema = new mongoose.Schema({
  siswaId: {
    type: mongoose.Schema.ObjectId,
    ref: "Siswa",
    required: [true, "Siswa ID wajib diisi"],
  },
  growthId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Growth",
    },
  ],
  noteId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Note",
    },
  ],
});

const Pesan = mongoose.model("Pesan", pesanSchema);

module.exports = Pesan;

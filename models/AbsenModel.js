const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.ObjectId,
    ref: "Class",
    required: [true, "Absen harus memiliki kelas"],
  },
  mapelId: {
    type: mongoose.Schema.ObjectId,
    ref: "Mapel",
    required: [true, "Absen harus memiliki Mata Pelajaran"],
  },
  tanggalAbsen: {
    type: String,
    required: [true, "Tanggal Absen wajib diisi"],
    trim: true,
  },
  attendance: [
    {
      siswaId: {
        type: mongoose.Schema.ObjectId,
        ref: "Siswa",
        required: [true, "Absen harus memiliki Siswa"],
      },
      kehadiran: {
        type: String,
        enum: {
          values: ["Hadir", "Sakit", "Izin", "Tanpa Ket."],
          message:
            "Kehadiran hanya diisi dengan nilai : Hadir, Sakit, Izin dan Tanpa Ket.",
        },
        default: "Tanpa Ket.",
      },
    },
  ],
});

attendanceSchema.index(
  { classId: 1, mapelId: 1, tanggalAbsen: 1 },
  { unique: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;

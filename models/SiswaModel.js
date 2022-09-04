const mongoose = require("mongoose");
const validator = require("validator");

const siswaSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Nama wajib diisi"],
    maxlength: [40, "Nama tidak boleh lebih dari 40 karakter"],
  },
  nis: {
    type: String,
    trim: true,
    required: [true, "NIS wajib diisi"],
    unique: true,
  },
  tempatLahir: {
    type: String,
    trim: true,
    required: [true, "Tempat Lahir wajib diisi"],
  },
  tanggalLahir: {
    type: String,
    trim: true,
    required: [true, "Tanggal Lahir wajib diisi"],
  },
  gender: {
    type: String,
    trim: true,
    enum: ["Laki-laki", "Perempuan"],
    required: [true, "Jenis Kelamin wajib diisi"],
  },
  religion: {
    type: String,
    trim: true,
    enum: ["Islam", "Kristen", "Hindu", "Budha"],
    required: [true, "Agama wajib diisi"],
  },
  education: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Alamat wajib diisi"],
  },
  namaAyah: {
    type: String,
    trim: true,
    required: [true, "Nama Ayah wajib diisi"],
  },
  namaIbu: {
    type: String,
    trim: true,
    required: [true, "Nama Ibu Wajib diisi"],
  },
  pekerjaanAyah: {
    type: String,
    trim: true,
  },
  pekerjaanIbu: {
    type: String,
    trim: true,
  },
  namaWali: {
    type: String,
    trim: true,
  },
  pekerjaanWali: {
    type: String,
    trim: true,
  },
  alamatWali: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Nomor Hp Orang Tua wajib diisi"],
  },
  // classId: {
  //   type: mongoose.Schema.ObjectId,
  //   trim: true,
  //   ref: "Class",
  //   required: [true, "Kelas Wajib Diisi"],
  // },
  photo: {
    type: String,
    trim: true,
    default: "default.jpg",
  },
});

const Siswa = mongoose.model("Siswa", siswaSchema);

module.exports = Siswa;

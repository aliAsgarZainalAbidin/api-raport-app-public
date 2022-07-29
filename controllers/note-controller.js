const Note = require("./../models/NoteModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Pesan = require("./../models/PesanModel");

exports.addNoteInPesan = catchAsync(async (req, res, next) => {
  const note = await Note.create(req.body);
  await Pesan.updateOne(
    { _id: req.body.pesanId.toString() },
    { $push: { noteId: note._id } }
  );

  const pesan = await Pesan.findById(req.body.pesanId);
  res.status(200).json({
    status: "Success",
    data: pesan,
  });
});

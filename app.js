const express = require("express");
const morgan = require("morgan");
const app = express();
const AppError = require("./utils/appError");

const accountRouter = require("./routes/account-router");
const siswaRouter = require("./routes/siswa-router");
const classRouter = require("./routes/class-router");
const mapelRouter = require("./routes/mapel-router");
const attendanceRouter = require("./routes/attedance-router");
const raportRouter = require("./routes/raport-router");
const tugasRouter = require("./routes/tugas-router");
const pesanRouter = require("./routes/pesan-router");
const growthRouter = require("./routes/growth-router");
const noteRouter = require("./routes/note-router");
const globalErrorHandler = require("./controllers/errorController");

app.use((req, res, next) => {
  console.log(`Hello from the middleware`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

//ROUTES
app.use("/api/v1/account", accountRouter);
app.use("/api/v1/siswa", siswaRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/mapel", mapelRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/raport", raportRouter);
app.use("/api/v1/tugas", tugasRouter);
app.use("/api/v1/pesan", pesanRouter);
app.use("/api/v1/growth", growthRouter);
app.use("/api/v1/note", noteRouter);
app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`));
});
app.use(globalErrorHandler);

module.exports = app;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
    .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("DB Connection Successfull");
  });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION");
  console.log(err.name, err.message);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

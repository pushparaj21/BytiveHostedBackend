/** @format */

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_LINK)
  .then((db) => console.log("connection done"))
  .catch((err) => console.log(" err  during connection: " + err.message));

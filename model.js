/** @format */

const mongoose = require("mongoose");

const UserCardSchema = mongoose.Schema({
  email: String,
  phone: String,
  website: String,
  name: String,
  username: String,
  id: Number,
});

const UserCardModel = mongoose.model("UserMediaCardDetails", UserCardSchema);

module.exports = UserCardModel;

/** @format */

const mongoose = require("mongoose");

const UserCardSchema = mongoose.Schema({
  email: String,
  phone: String,
  website: String,
  name: String,
  username: String,
  id: Number,
  like: Boolean,
});

const UserCardModel = mongoose.model("UserMediaCardDetails1", UserCardSchema);

module.exports = UserCardModel;

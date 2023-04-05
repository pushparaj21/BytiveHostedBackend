/** @format */

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const UserCardModel = require("./model");

dotenv.config({ path: "./config.env" });

try {
  require("./connection");
} catch (error) {
  console.log("error hai bro", error);
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// just a get request
app.get("/getUserList", (req, res) => {
  console.log("chiththi aayi hai");
  try {
    UserCardModel.find({}).then((data) => {
      // console.log(data);
      return res.status(200).json({
        retrievedData: data,
        status: "SUCCESS",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "FAILED",
    });
  }
});

/*
 * Body in the create user entry must contain following fields:
 * imgSrc
 * email
 * contactNo
 * website
 */
app.post("/createUser", (req, res) => {
  try {
    UserCardModel.create({ ...req.body }).then((data) => {
      res.status(200).json({
        status: "SUCCESS",
        data: data,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "FAILED",
    });
  }
});

// edit the user
app.patch("/editUser/:_id", (req, res) => {
  console.log(req.params._id);
  console.log(req.body);
  const dataToUpdate = req.body;
  try {
    UserCardModel.findOneAndUpdate(
      { _id: req.params._id },
      { ...dataToUpdate },
      { new: true }
    ).then((data) => {
      console.log("Updated data is ", data);
      res.status(200).json({
        status: "DATA_UPDATION_SUCCESS",
        data: data,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "DATA_UPDATION_FAILED",
    });
  }
});

// delete the user
app.delete("/deleteUser", (req, res) => {
  try {
    console.log(req.body._id);
    UserCardModel.findOneAndDelete({ _id: req.body._id }).then((data) => {
      console.log("deletd itm", data);
      res.status(200).json({
        status: "DATA DELETION SUCCESS",
        data: data,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "DATA DELETION FAILED",
    });
  }
});

const PORT = process.env.PORT | 5000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`failed to listen because ${error}`);
  } else {
    console.log(`listening at ${process.env.PORT}`);
  }
});

const mongoose = require("mongoose");

schema = new mongoose.Schema(
  {
    phoneNumber: { type: "String", required: true, unique: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", schema);

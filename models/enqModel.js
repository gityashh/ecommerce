const mongoose = require("mongoose");

const enqSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("Enquiry", enqSchema);

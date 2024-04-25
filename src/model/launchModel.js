const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema(
  {
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Developer",
    },
    video: [String],
    thumbnail: [String],
    launchDetails: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    availableTypes: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Type" },
    ],
    location: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    launchDescription: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Launch = mongoose.model("Launch", launchSchema);

module.exports = Launch;

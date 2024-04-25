const mongoose = require("mongoose");
const { deleteImages } = require("../utils/upload");

const TypeSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  image: [{ type: String, required: true }],
  description: {
    en: { type: String, required: false },
    ar: { type: String, required: false },
  },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
});

TypeSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    let imagePaths = [];
    if (doc.image && doc.image.length) {
      imagePaths = imagePaths.concat(doc.image);
    }
    const properties = await mongoose.model("Property").find({ type: doc._id });
    for (const property of properties) {
      if (property.images && property.images.length) {
        imagePaths = imagePaths.concat(property.images);
      }
      await property.remove();
    }

    if (imagePaths.length > 0) {
      await deleteImages(imagePaths);
    }
  }
  next();
});
const Type = mongoose.model("Type", TypeSchema);
module.exports = Type;

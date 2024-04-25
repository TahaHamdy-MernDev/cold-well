const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  location: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  price: {
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  size: { type: Number, required: true },

  compound: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  deliveryDate: { type: Date, required: true },
  uniqueSellingPoints: [
    {
      title: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
      },
      description: {
        en: { type: String, required: true },
        ar: { type: String, required: true }
      }
    }
  ],
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  thumbnail:[String],
  images: [String],
  paymentPlans: [
    {
      planName: { type: String, required: true },
      monthlyPayment: { type: Number, required: true },
      downPayment: { type: Number, required: true },
      durationYears: { type: Number, required: true },
    },
  ],

  type: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
  },
  for:{
    type: String,
    enum: ['Sale', 'Rent',],
  },
  byUser: {
    type: Boolean,
    default: false,
  },
});
PropertySchema.pre("save", async function (next) {
  if (this.isNew) {
    await mongoose
      .model("Type")
      .findByIdAndUpdate(this.type, { $push: { properties: this._id } });
    await mongoose
      .model("Developer")
      .findByIdAndUpdate(this.developer, { $push: { properties: this._id } });
  }
  next();
});
PropertySchema.pre(/^find/, function (next) {
  this.populate({ path: 'type',
  select: 'name image'}).populate({
    path: 'developer',
    select: 'contact logoUrl name',
  })
  next();
});


PropertySchema.post("findOneAndDelete", async function (doc) {
  await mongoose
    .model("Type")
    .findByIdAndUpdate(doc.type, { $pull: { properties: doc._id } });
  await mongoose
    .model("Developer")
    .findByIdAndUpdate(doc.developer, { $pull: { properties: doc._id } });
});
const Property = mongoose.model("Property", PropertySchema);
module.exports = Property;








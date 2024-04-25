const mongoose = require('mongoose');

const DeveloperSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  logoUrl: [{ type: String, required: true }], 
  description: {
    en: { type: String, required: false },
    ar: { type: String, required: false }
  },
  contact: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: false } 
  },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] 
});

const Developer= mongoose.model('Developer', DeveloperSchema);
module.exports = Developer;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const patientSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: 'string' } },
    },
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const ModelClass = mongoose.model('patient', patientSchema);

module.exports = ModelClass;

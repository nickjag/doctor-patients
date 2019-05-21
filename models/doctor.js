const mongoose = require('mongoose');

const { Schema } = mongoose;

const doctorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const ModelClass = mongoose.model('doctor', doctorSchema);

module.exports = ModelClass;

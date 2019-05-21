const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    index: {
      unique: true,
      partialFilterExpression: { username: { $type: 'string' } },
    },
  },
  user_data: {
    type: Schema.Types.ObjectId,
    refPath: 'user_type',
    default: null,
  },
  user_type: {
    type: String,
    default: 'patient',
    enum: ['patient', 'doctor'],
    required: true,
  },
});

userSchema.plugin(timestamps, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

userSchema.pre('save', function preSave(next) {
  const user = this;

  if (!this.isModified('password')) {
    return next();
  }
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    return bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) {
        return next(err2);
      }
      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  });
};

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;

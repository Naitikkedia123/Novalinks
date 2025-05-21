const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
  type: String,
  required: true,
  unique: true,
  validate: {
    validator: function (v) {
      // Simple email regex
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
    },
    message: 'Please enter a valid email address'
  }
}
,
  createdAt: {
    type: Date,
    default: Date.now
  },
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'doctor'
    }
  ],
  chatLink: {
    type: String,
    unique: true
  },
  role: { type: String, default: 'patient' }
});

patientSchema.plugin(passportLocalMongoose, { usernameField: 'phoneNumber' });

module.exports = mongoose.model('Patient', patientSchema);

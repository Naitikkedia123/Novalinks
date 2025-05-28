const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'fromModel'
  },
  fromModel: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient']
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'toModel'
  },
  toModel: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient']
  },
  msg: String, // Optional for text
  type: {
    type: String,
    enum: ['text', 'image'],
    default: 'text',
  },
  caption: String, // Optional caption for image
  mediaUrl: String, // ✅ New field to store image/video/file URL
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  }
}, { timestamps: true }); // Adds createdAt and updatedAt

module.exports = mongoose.model('Chat', chatSchema);

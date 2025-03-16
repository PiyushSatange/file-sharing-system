const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  uploadDate: {
    Timestamp: Date,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  isStarred: {
    type: Boolean,
    required: true,
    default: false,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  sharedWith: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      accessLavel: {
        type: String,
        enum: ["read", "edit"],
      },
    },
  ],
});

const File = mongoose.model("file", fileSchema);

module.exports = { File };

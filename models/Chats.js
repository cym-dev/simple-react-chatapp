const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Entity = mongoose.model("Chats", modelSchema);

module.exports = Entity;

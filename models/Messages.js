const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
    },
    seen: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byChatId = function (chatId) {
  return this.where({ chatId });
};
const Entity = mongoose.model("Messages", modelSchema);

module.exports = Entity;

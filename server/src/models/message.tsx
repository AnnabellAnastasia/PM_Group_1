import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface IMessage {
  body: string,
  creator: mongoose.Types.ObjectId,
  chatId: mongoose.Types.ObjectId
}

const messageSchema = new Schema<IMessage>(
    {
      body: { type: String, required: [true, "Body is required"] },
      creator: { type: Schema.Types.ObjectId, ref: "User" },
      chatId: { type: Schema.Types.ObjectId, ref: "Conversation"}
    },
    { timestamps: true }
  );

export default messageSchema;
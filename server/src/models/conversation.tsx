import mongoose, { Document, Model, Types } from "mongoose";
import message from "./message";
const Schema = mongoose.Schema;

//conversationSchema contains a list of all the messages between two given users,
//each messageSchema document contains the message and its creator, as well as the
//conversation that it belongs to.
interface IMessage {
  _id: Types.ObjectId;
  body: string;
  creator: Types.ObjectId;
  chatId: Types.ObjectId;
}

interface IConversation extends Document {
  _id: Types.ObjectId;
  messages: Types.ObjectId[];
  user1: Types.ObjectId;
  user2: Types.ObjectId;
}

type ConversationModelType = Model<IConversation>;
const conversationSchema = new Schema<IConversation, ConversationModelType>(
  {
    messages: [{type: Types.ObjectId, ref: "Message"}],
    user1: { type: Schema.Types.ObjectId, ref: "User" },
    user2: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);

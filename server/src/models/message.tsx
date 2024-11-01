import mongoose from "mongoose";
import { Types, Model, Schema } from "mongoose";

//message definition
interface IMessage {
  _id: Types.ObjectId;
  body: string;
  creator: Types.ObjectId;
  chatId: Types.ObjectId;
}

//define schema type for ts
type MessageSchemaType = Model<IMessage>;
//define schema 
const messageSchema = new Schema<IMessage, MessageSchemaType>({
  body: { type: String, required: [true, "Body is required"] },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  chatId: { type: Schema.Types.ObjectId, ref: "Conversation" },
}, 
{
  timestamps: true
});

export default mongoose.model("Message", messageSchema);

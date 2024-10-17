import mongoose from "mongoose";

const Schema = mongoose.Schema;

//conversationSchema contains a list of all the messages between two given users, 
//each messageSchema document contains the message and its creator, as well as the 
//conversation that it belongs to. 

const messageSchema = new Schema(
  {
    body: { type: String, required: [true, "Body is required"] },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const conversationSchema = new Schema(
  {
    items: [messageSchema],
    user1: { type: Schema.Types.ObjectId, ref: "User" },
    user2: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);

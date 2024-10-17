import mongoose from "mongoose";
const Schema = mongoose.Schema;


const messageSchema = new Schema(
    {
      body: { type: String, required: [true, "Body is required"] },
      creator: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
  );

  export default mongoose.model("Message", messageSchema);
import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {type: String, required:true}, 
    description: {type: String, required:false}, 
    members: [{type: Types.ObjectId, ref: "User"}],
    mods: [{type: Types.ObjectId, ref:"User"}], 
    posts: [{type: Types.ObjectId, ref:"Post"}]
})

export default mongoose.model("Group", groupSchema);
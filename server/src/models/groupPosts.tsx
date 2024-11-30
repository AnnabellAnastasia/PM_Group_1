import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const groupPostSchema = new Schema({
    post: {type: Types.ObjectId, ref: "Post"},
    group: {type: Types.ObjectId, ref: "Group"}
});

// groupPostSchema.index({ post: 1, group: 1 }, { unique: true });

export default mongoose.model("GroupPost", groupPostSchema);
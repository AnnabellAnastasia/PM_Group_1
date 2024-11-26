import mongoose from "mongoose";

const Schema = mongoose.Schema;

const repostSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    reposter: {type:Schema.Types.ObjectId, ref:'User'}
},
    {timestamps: true}
);

export default mongoose.model('reposts', repostSchema);
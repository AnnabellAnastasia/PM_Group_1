import mongoose from "mongoose";

const Schema = mongoose.Schema;

const repostSchema = new Schema({
    post:{type: Schema.Types.ObjectId, ref: 'User'},
    author:{type:Schema.Types.ObjectId, ref:'User'},
    reposter:{type:Schema.Types.ObjectId, ref:'User'}
},
    {timestamps: true}
);

repostSchema.index({ reposter: 1, post: 1 }, { unique: true });

export default mongoose.model('reposts', repostSchema);
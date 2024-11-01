import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema({
	liker: { type: Schema.Types.ObjectId, ref: 'User' },
	post: { type: Schema.Types.ObjectId, ref: 'User' }
},
	{timestamps: true}
);

likeSchema.index({ liker: 1, post: 1 }, { unique: true });

export default mongoose.model('Like', likeSchema);
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
	body: { type: String, required: [true, 'Body is requred']},
	commenter: { type: Schema.Types.ObjectId, ref: 'User' },
	post: { type: Schema.Types.ObjectId, ref: 'Post' },
},
	{timestamps: true}
);

export default mongoose.model('Comment', commentSchema);
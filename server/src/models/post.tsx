import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
	body: { type: String, required: [true, 'Body is requred']}
},
	{timestamps: true}
);

export default mongoose.model('Post', postSchema);
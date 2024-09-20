import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: [true, 'Username is requred']}
},
	{timestamps: true}
);

export default mongoose.model('User', userSchema);
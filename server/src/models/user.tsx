import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: [true, 'Username is requred']},
	firstName: { type: String, required: [true, 'First Name is requred']},
	lastName: { type: String, required: [true, 'Last Name is requred']},
	image: { type: String, required: [true, 'image is required'] }
},
	{timestamps: true}
);

export default mongoose.model('User', userSchema);
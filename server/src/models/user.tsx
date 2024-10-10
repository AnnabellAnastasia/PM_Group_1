import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: { type: String, required: [true, 'First Name is requred']},
	lastName: { type: String, required: [true, 'Last Name is requred']},
	image: { type: String, required: [true, 'Image is required'] },
	email: { type: String, required: [true, 'Email Address is required'], unique: [true, 'This email address is already registered with an account'] },
	password: { type: String, required: [true, 'Password is required'] },
},
	{timestamps: true}
);

// Password hashing on save
userSchema.pre('save', function (next) {
	let user = this;
	if (!user.isModified('password'))
		return next();
	else {
		bcrypt.hash(user.password, 10)
			.then((hash: any) => {
				user.password = hash;
				next();
			})
			.catch((err: any) => next(err));
	}
});

// Compare password to hash on login
userSchema.methods.comparePassword = function(login: any) {
	return bcrypt.compare(login, this.password);
};

export default mongoose.model('User', userSchema);
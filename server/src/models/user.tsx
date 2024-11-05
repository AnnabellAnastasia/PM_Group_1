import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const visibilityOptions = [
	"public", "friends", "hidden"
];

const visibilityDefault = "hidden";

const userSchema = new Schema({
	firstName: { type: String, required: [true, 'First Name is requred']},
	lastName: { type: String, required: [true, 'Last Name is requred']},
	image: { type: String, required: [true, 'Image is required'] },
	unccEmail: { type: String, required: [true, 'Email Address is required'], unique: [true, 'This email address is already registered with an account'] },
	password: { type: String, required: [true, 'Password is required'] },
	description: { type: String },
	location: { type: String },
	major: { type: String },
	minor: { type: String },
	concentration: { type: String },
	website: { type: String },
	github: { type: String },
	twitter: { type: String },
	instagram: { type: String },
	facebook: { type: String },
	secondaryEmail: { type: String },
	phone: { type: String },
	address: { type: String },
	unccEmailVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	descriptionVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	locationVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	majorVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	minorVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	concentrationVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	websiteVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	githubVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	twitterVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	instagramVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	facebookVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	secondaryEmailVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	phoneVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
	addressVisibility: { type: String, default: visibilityDefault, enum: visibilityOptions},
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

userSchema.index({ firstName: 'text', lastName: 'text' });

export default mongoose.model('User', userSchema);
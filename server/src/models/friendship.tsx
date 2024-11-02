import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendshipSchema = new Schema({
	user1: { type: Schema.Types.ObjectId, ref: 'User' },
	user2: { type: Schema.Types.ObjectId, ref: 'User' }
},
	{timestamps: true}
);

friendshipSchema.index({ user1: 1, user2: 1 }, { unique: true });

export default mongoose.model('Friendship', friendshipSchema);
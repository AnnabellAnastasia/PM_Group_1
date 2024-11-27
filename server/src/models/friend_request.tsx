import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
	sender: { type: Schema.Types.ObjectId, ref: 'User' },
	recipient: { type: Schema.Types.ObjectId, ref: 'User' }
},
	{timestamps: true}
);

friendRequestSchema.index({ sender: 1, recipient: 1 }, { unique: true });

export default mongoose.model('FriendRequest', friendRequestSchema);
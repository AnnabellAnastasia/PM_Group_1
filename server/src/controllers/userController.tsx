import model from '../models/user';

const controller = {
// GET /users - Get all users
all: async (req: any, res: any, next: any) => {
	model.find()
	.then((users) => {
		res.send(users).status(200);
	})
	.catch((err: any) => {
		next(err);
	})
},
create: async (req: any, res: any, next: any) => {
	let user = new model(req.body);
	user.save()
		.then(() => {
			console.log("Saved!");
			res.status(200);
		})
		.catch((err: any) => {
			next(err);
		})
},
delete: async(req:any,res:any,next:any)=>{
	// finds the user by username
	model.find()
	.then
},

};

export default controller;
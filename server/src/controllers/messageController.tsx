import model from "../models/message"
import jwt from "jsonwebtoken"

const controller: any = {
    all: async (req: any, res: any, next: any) => {
        const userId2 = req.params;
        const userId1 = req.id;
        model
        .find({
            $or: [
              { sender: userId1, receiver: userId2 },
              { sender: userId2, receiver: userId1 }
            ]
          })
          .sort({ timestamp: 1 })
          .populate('body', 'creator', 'recipient')
        .then((messages) => {
            if(messages && messages[0]) {
                res.json(messages);
            } else {
                res.status(404).json("No messsages found");
            }
        })
        .catch((err:any) => {
            res.json({message: err.message});
        });
	},
    create: async(req:any, res:any, next:any) => {
        let newMessage = new model(req.body);

        newMessage
        .save()
        .then((newMessage) => {
            res.json(newMessage);
        })
        .catch((err:any) => {
            res.json({message:err.message});
        });
    }
}

export default controller;
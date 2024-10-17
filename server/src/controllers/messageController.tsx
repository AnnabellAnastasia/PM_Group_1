import { timeStamp } from "console";
import model from "../models/message"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const controller: any = {
    //get all messages between the user and everyone else
    all: async(req:any, res:any, next:any) => {
        let cList:any[];//conversations
        let mList:any[] = [];//messages (last messages preferrably)
        model.aggregate([
            {
                $match: {
                    $or: [
                        { user1: new mongoose.Types.ObjectId(req.id) },
                        { user2: new mongoose.Types.ObjectId(req.id) }
                    ],
                },
            }, {
                $sort: {timeStamp: -1},
            }
        ])
        .then((result) => {
            if(result) {
                cList = result;
                cList.forEach(element => {
                    let len = element.length;
                    mList.push(element[len-1]);//get last document in list of messages for each convo
                });
                if(mList && mList[0]) {
                    res.json(mList);
                } else {
                    res.status(404).json("No messsages found");
                }
            } else {
                res.status(404).json("no conversations");
            }
            
        })
        .catch((err:any) => {
            res.json({message: err.message});
        })      
        //     $or: [
        //       { user1: req.id },
        //       { user2: req.id }
        //     ]
        //   }).sort({timeStamp:-1})
        //   .then((convoList) => {
        //     convoList.forEach((conversation)=> {
        //         
        //     })
        //   })
    },
    details: async (req: any, res: any, next: any) => {
        const userId2 = req.params;
        const userId1 = req.id;
        model
        .find({
            $or: [
              { creator: userId1, recipient: userId2 },
              { creator: userId2, recipient: userId1 }
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
    }, 
    close: async(req:any, res:any, next:any) => {
        let messagesList:any[];
        messagesList = req.body;
        if(Array.isArray(messagesList)){
            messagesList.forEach((message) => {
                let newMessage = new model(message);
                newMessage
                .save()
                .then((newMessage:any)=> {
                    res.json(newMessage);
                })
                .catch((err:any) => {
                    res.json({message:err.message});
                });
            });
        }
    }
}

export default controller;
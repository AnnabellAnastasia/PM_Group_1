import { timeStamp } from "console";
import model from "../models/conversation";
import messageModel from "../models/message";
import jwt from "jsonwebtoken";
import mongoose, { connection } from "mongoose";

const controller: any = {
  //get all messages between the user and everyone else
  all: async (req: any, res: any, next: any) => {
    let cList: any[]; //conversations
    let mList: any[] = []; //messages (last messages preferrably)
    model
      .aggregate([
        {
          $match: {
            $or: [
              { user1: new mongoose.Types.ObjectId(req.id) },
              { user2: new mongoose.Types.ObjectId(req.id) },
            ],
          },
        },
        {
          $sort: { timeStamp: -1 },
        },
      ])
      .then((result) => {
        if (result) {
          cList = result;
          cList.forEach((element) => {
            // let convo = new model(element);
            let len = element.messages.length;
            mList.push(element.messages[len - 1]); //get last document in list of messages for each convo
          });
          if (mList && mList[0]) {
            res.json(mList);
          } else {
            res.status(404).json("No messsages found");
          }
        } else {
          res.status(404).json("no conversations");
        }
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  //show conversation between two users
  details: async (req: any, res: any, next: any) => {
    const mId = req.params.messageId;
    //const cId = req.params.conversationId;
    let cId: any;
    model
      .findById(mId)
      .populate("body", "creator")
      .then((result) => {
        if (result) {
          cId = result.$parent();
        } else {
          res.status(404).json("Error finding conversation");
        }
        model
          .findById(cId)
          .populate("messages", "user1", "user2")
          .then((response) => {
            if (!response || response == null)
              res.status(404).json("No messages found");
            else if (response.messages && response.messages.length) {
              res.json(response.messages);
            } else {
              res.status(404).json("No messages found in this conversation");
            }
          });
      })
      .catch((err: any) => {
        console.error("Error fetching conversation details", err);
        res.status(500).json({ message: err.message });
      });
    // .then(() => {
    //     model.findById(cId).populate("messages", "user1", "user2")
    // .then((response) => {
    //     if (!response || response == null) res.status(404).json("No messages found");
    //     else if (response.messages && response.messages.length) {
    //       res.json(response.messages);
    //     } else {
    //       res.status(404).json("No messages found in this conversation");
    //     }
    // })
  },
  //save all new messages to mongodb
  close: async (req: any, res: any, next: any) => {
    try {
      let messagesList: any[];
      messagesList = JSON.parse(req.body); //turn the json back into an array
      if (Array.isArray(messagesList)) {
        let conversation = messagesList[0].parent();
        if (!conversation) {
          return res.status(404).json("Conversation not found");
        }
        //save each message in the list
        messagesList.forEach((message) => {
          let newMessage = new model(message);
          conversation.messages.push(newMessage);
        });
        await conversation.save(); // Save the conversation with the updated messages
        res.status(200).json({ message: "Messages saved successfully." });
      } else {
        res.status(400).json("Invalid messages list");
      }
    } catch (err: any) {
      console.error("Error saving conversation", err);
    }
  },
};

export default controller;

//send message (not required with socket.io) - will probably remove
// create: async (req: any, res: any, next: any) => {
//     let newMessage = new model(req.body);
//     newMessage
//       .save()
//       .then((newMessage) => {
//         res.json(newMessage);
//       })
//       .catch((err: any) => {
//         res.json({ message: err.message });
//       });
//   },

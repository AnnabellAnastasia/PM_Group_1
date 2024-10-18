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
    const cId = req.params.chatId;
    //const cId = req.params.conversationId;
    // let cId: any;
    // model
    //   .findById(mId)
    //   .populate("body", "creator", "chatId")
    //   .then((result) => {
    //     if (result) {
    //       cId = result.$parent();
    //     } else {
    //       res.status(404).json("Error finding conversation");
    //     }
    //     model
    //       .findById(cId)
    //       .populate("messages", "user1", "user2")
    //       .then((response) => {
    //         if (!response || response == null)
    //           res.status(404).json("No messages found");
    //         else if (response.messages && response.messages.length) {
    //           res.json(response.messages);
    //         } else {
    //           res.status(404).json("No messages found in this conversation");
    //         }
    //       });
    //   })
    //   .catch((err: any) => {
    //     console.error("Error fetching conversation details", err);
    //     res.status(500).json({ message: err.message });
    //   });
    model.findById(cId).populate("messages", "user1", "user2")
    .then((response) => {
        if (!response || response == null) res.status(404).json("No messages found");
        else if (response.messages && response.messages.length) {
          res.json(response);//send entire chat object
        } else {
          res.status(404).json("No messages found in this conversation");
        }
    }).catch((err:any) => {
        console.error("Error showing conversation", err);
    })
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
            // var nm = {
            //     body = message.content,
            //     creator = message.u
            // }
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
  //make a new chat with a user
  new: async(req: any, res: any, next: any) => {
    const {userId} = req.body;
    if(!userId) {
        console.log("user id not sent with request");
        return res.sendStatus(400);
    }
    model.find({
        $and: [
            { user1: req.id, user2: userId},
            { user2: userId, user1: req.id}
        ]
    }).populate("messages", "user1", "user2")
    .then((response) => {
        if (!response || response == null){
          var chatData = {
            messages: [], 
            user1: req.id, 
            user2: userId
          }
          model.create(chatData)
          .then((chat) => {
            res.status(200).json(chat);
          })
        } else {
          res.status(404).json("There was an issue loading chat");
        }
        // else if (response.messages && response.messages.length) {
        //   res.json(response.messages);
        // } 
    }).catch((err:any) => {
        console.error("Error showing conversation", err);
    })

  }
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

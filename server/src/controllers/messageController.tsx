import { timeStamp } from "console";
import model from "../models/conversation";
import message from "../models/message";
import jwt from "jsonwebtoken";
import mongoose, { connection, Types } from "mongoose";
import { IConversation } from "../models/conversation";

const controller: any = {
  //TODO: fix json responses
  /*
   *    Get all messages between user and anyone else
   */
  all: async (req: any, res: any, next: any) => {
    
    let conversationList:any[];
    try {
      const result = await model
        .find({
          $or: [{ user1: req.id }, { user2: req.id }],
        })
        .sort({ timestamp: -1 });

      conversationList = await Promise.all(result);
      console.log("result from dbOp: ", conversationList);

      if (!conversationList || conversationList.length === 0) {
        console.log("returned 204");
        return res.status(204).json("No conversations");
      } else {
        let messagesList: any[][] = Array.from({length: conversationList.length}, () => []);
        if(conversationList[0].messages && conversationList[0].messages.length){
       
          Promise.all(
            conversationList.map((conversation:any, i:number) => {
              //create promise for each list of messages
              return Promise.all(
                conversation.messages.map((msgId:any) => {
                  return message.findById(msgId)
                  .populate('creator', 'firstName lastName image').then((rmsg) => {
                    messagesList[i].push(rmsg);
                  });
                })
              );
            })
          ).then(() => {
            messagesList = messagesList.filter((msg) => msg[0] !== null);
            console.log("messages have been retrieved");
            console.log("retrieved messages ", messagesList);
            return res.json(messagesList);
          })
        }
      }
    } catch (err: any) {
      res.status(500).json({message:err.message});
    }
  },

  /*
   *    Show conversation between two users
   */
  details: async (req: any, res: any, next: any) => {
    const cId = req.params.chatId;
    model
      .findById(cId)
      .then((response) => {
        if (!response || response == null)
          res.status(204).json("No messages found");
        else if (response.messages && response.messages.length) {
          let mList: any[] = [];
          Promise.all(
            response.messages.map((msg: Types.ObjectId) => {
              return message.findById(msg).then((rMsg: any) => rMsg);
            })
          ).then((messages) => {
            mList.push(...messages);
            console.log(mList);
            return res.json({ mList });
          });
        }
      })
      .catch((err: any) => {
        console.error("Error showing conversation", err);
      });
  },

  /*
   *   Save all new messages to mongodb
   */
  close: async (req: any, res: any, next: any) => {
    let messagesList: any[];
    messagesList =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    let conversationId: any = null;
    let messageIdList: Types.ObjectId[] = [];
    Promise.all(
      messagesList.map((m) =>
        message
          .create({
            body: m.body,
            creator: m.creator,
            chatId: m.chatId,
          })
          .then((msg) => {
            if (!conversationId) conversationId = msg.chatId;
            messageIdList.push(msg._id);
            return msg;
          })
      )
    )
      .then(() => {
        // Find the conversation after all messages are created
        return model.findById(conversationId);
      })
      .then((convo) => {
        if (!convo) {
          return res.status(404).json({ message: "No conversation found" });
        }
        convo.messages.push(...messageIdList);
        return convo.save();
      })
      .then(() => {
        res.status(200).json({ message: "Messages saved" });
      })
      .catch((err: any) => {
        console.error("Error saving conversation", err);
      });
  },

  new: async (req: any, res: any, next: any) => {
    const { _id1: usr1, _id2: usr2 } = req.body;
    if (!usr1 || !usr2) {
      console.log("user id not sent with request");
      return res.sendStatus(400);
    }
    try {
      const existingChat = await model.find({
        $or: [
          { user1: usr1, user2: usr2 },
          { user1: usr2, user2: usr1 },
        ],
      });
      if (existingChat.length) {
        if (existingChat[0].messages && existingChat[0].messages.length) {
          const mList: any[] = await Promise.all(
            existingChat[0].messages.map(async (msg: Types.ObjectId) => {
              return await message.findById(msg);
            })
          );
          if (mList) {
            return res.json(JSON.stringify(mList)); //send entire chat object
          }
        } else {
          return res.status(200).json({ chatId: existingChat[0]._id });
        }
      }
      console.log("No existing chat found, creating a new chat.");
      const newChat = await model.create({
        messages: [],
        user1: usr1,
        user2: usr2,
      });
      return res.status(200).json({ chatId: newChat._id });
    } catch (err: any) {
      console.error("error getting new message", err);
      res.sendStatus(500);
    }
  },
};

export default controller;

// let cList: any[]; //conversations
// let mList: any[] = []; //messages (last messages preferrably)
// console.log("fetch all messages db op called");

// try {
//   const result = await model.find({
//     $or: [{user1: req.id}, {user2: req.id}],
//   }).sort({timestamp: -1});

//   if(!result || result.length === 0) {
//     console.log("returned 204");
//     return res.status(204).json("No conversations");
//   }

//   cList = result;
//   console.log("results from fetchall", result);

//   const messagePromises = cList.map((element) => {
//     const len = element.messages.length;
//     if(len > 0) {
//       return message.findById(element.messages[len -1]);
//     }
//     return null;
//   });

//   mList = await Promise.all(messagePromises);

//   mList = mList.filter((msg) => msg !== null);

//   if(mList.length > 0) {
//     res.json({messages: mList});
//   } else {
//     res.status(204).json("no messages found");
//   }
// } catch (err:any) {
//   console.error("Error fetching messages", err);
//   res.status(500).json({message:err.message});
// }

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
            //get length of messages array
            let len = element.messages.length;
            //get the message with the id at the end of the array and push it into the return list
            message.findById(element.messages[len - 1]).then((msg) => {
              mList.push(msg);
            });
          });
          if (mList && mList[0]) {
            res.json(JSON.stringify(mList));
            console.log(mList);
          } else {
            res.status(204).json("No messsages found");
          }
        } else {
          res.status(204).json("no conversations");
        }
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
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
          response.messages.forEach((msg: Types.ObjectId) => {
            message.findById(msg).then((rMsg: any) => {
              mList.push(rMsg);
            });
          });
          if (mList) {
            res.json(JSON.stringify(mList)); //send entire chat object
          } else {
            res.status(404).json("error fetching conversation");
          }
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
    try {
      let messagesList: any[];
      messagesList =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      console.log(messagesList);
      let conversationId: any = null;
      let conversation: any;
      let messageIdList:Types.ObjectId[] = [];
        messagesList.forEach((m) => {
          // model.findById(conversationId).then((response) => {
          //   conversation = response;
            message
              .create({
                body: m.body,
                creator: m.creator,
                chatId: m.chatId,
              })
              .then((msg) => {
                if(!conversationId) conversationId = msg.chatId;
                messageIdList.push(msg._id);
              })
              // .then((newMessage: any) => {
              //   console.log("after create message");
              //   conversation.messages.push(newMessage._id);
              // });
          });
          model.findById(conversationId).then((convo) => {
            if(!convo) return res.status(404).json({message: "no conversation found"});
            messageIdList.forEach((msg) => {
              convo.messages.push(msg);
            })
            convo.save()
            .then(() => {
              res.status(200).json({ message: "Messages saved"});
            })
          })

          

          // console.log(m);
          // message
          //   .create({
          //     body: m.body,
          //     creator: m.creator,
          //     chatId: m.chatId,
          //   })
            // .then((newMessage: any) => {
            //   console.log("after create message");
            //   conversation.messages.push(newMessage._id);
            // });
        // });
      //   conversation
      //     .save() // Save the conversation with the updated messages
      //     .then(() => {
      //       res.status(200).json({ message: "Messages saved successfully." });
      //     });
      // });
      //  else {
      //   res.status(400).json("Invalid messages list");
      // }
    } catch (err: any) {
      console.error("Error saving conversation", err);
    }
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

    // model
    //   .find({
    //     $or: [
    //       { user1: usr1, user2: usr2 },
    //       { user1: usr2, user2: usr1 },
    //     ],
    //   })
    //   .then((response) => {
    //     if(response.length) {
    //       console.log("existing chat found:", response)
    //       res.status(200).json(response);
    //       return;
    //     } else if (!response.length) {
    //       console.log("from database", response);
    //       const chatData = {
    //         messages: [],
    //         user1: usr1,
    //         user2: usr2,
    //       };
    //       model.create(chatData).then((chat) => {
    //         res.status(200).json({chatId: chat._id}); //return chat id
    //         return;
    //       });
    //     }

    // })
  },

  /*
   *    Make a new chat with a new user
   */
  // new: async (req: any, res: any, next: any) => {
  //   const { userId } = req.body;
  //   if (!userId) {
  //     console.log("user id not sent with request");
  //     return res.sendStatus(400);
  //   }
  //   model
  //     .find({
  //       $and: [
  //         { user1: req.id, user2: userId },
  //         { user2: userId, user1: req.id },
  //       ],
  //     })
  //     .populate("messages", "user1", "user2")
  //     .then((response) => {
  //       if (!response || response == null) {
  //         var chatData = {
  //           messages: [],
  //           user1: req.id,
  //           user2: userId,
  //         };
  //         model.create(chatData).then((chat) => {
  //           res.status(200).json(chat);
  //         });
  //       } else {
  //         res.status(404).json("There was an issue loading chat");
  //       }
  //       // else if (response.messages && response.messages.length) {
  //       //   res.json(response.messages);
  //       // }
  //     })
  //     .catch((err: any) => {
  //       console.error("Error showing conversation", err);
  //     });
  // },
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

//setupif there is already messages found
// else if (typeof response.messages === [Types.ObjectId], )) {
//   //chat found
//   let mList: any[] = [];
//   response.messages.forEach((msg: Types.ObjectId) => {
//     message.findById(msg).then((rMsg: any) => {
//       mList.push(rMsg);
//     });
//   });
// }

import { timeStamp } from "console";
import model from "../models/conversation";
import message from "../models/message";
import jwt from "jsonwebtoken";
import mongoose, { connection, Types } from "mongoose";
import { IConversation } from "../models/conversation";

const controller: any = {
  /**
   * return all conversations between user and anyone else
   * @param req 
   * @param res 
   * @param next 
   */
  all: async (req: any, res: any, next: any) => {
    let conversationList: any[];
    try {
      const result = await model
        .find({
          $or: [{ user1: req.id }, { user2: req.id }],
        })
        .populate('messages', 'body creator chatId')
        .populate('user1', 'firstName lastName image')
        .populate('user2', 'firstName lastName image')
        .sort({ timestamp: -1 })
        .then((result)=> {
          return res.json(result);
        })      
    } catch (err: any) {
      res.status(500).json({ message: err.message });
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
    console.log("messages list", messagesList);
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
      }).populate('messages', 'body creator chatId')
      .populate('user1', 'firstName lastName image')
      .populate('user2', 'firstName lastName image');
      if (existingChat.length) {
        console.log("chat object returned", existingChat);
        return res.json(existingChat);
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
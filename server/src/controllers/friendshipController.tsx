import { Types } from "mongoose";
import model from "../models/friendship";

const controller = {
  // GET /posts/:id/friendships - Get all friendships for a user
  all: async (req: any, res: any, next: any) => {
    let userID = req.params.id;
    model
      .find({ user1: userID })
      .populate("user2", "firstName lastName image")
      .then((friendships1) => {
        const allFriendships: {
          _id: Types.ObjectId;
          createdAt: NativeDate;
          updatedAt: NativeDate;
          user: Types.ObjectId | null | undefined;
        }[] = [];
        friendships1.forEach((friend) => {
          let newUser = {
            _id: friend._id,
            createdAt: friend.createdAt,
            updatedAt: friend.updatedAt,
            user: friend.user2,
          };
          allFriendships.push(newUser);
        });

        model
          .find({ user2: userID })
          .populate("user1", "firstName lastName image")
          .then((friendships2) => {
            friendships2.forEach((friend) => {
              let newUser = {
                _id: friend._id,
                createdAt: friend.createdAt,
                updatedAt: friend.updatedAt,
                user: friend.user1,
              };
              allFriendships.push(newUser);
            });

            res.json(allFriendships);
          })
          .catch((err: any) => {
            res.json({ message: err.message });
          });
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // POST /posts/:id/friendships - Create new friendship
  create: async (req: any, res: any, next: any) => {
    let like = new model(req.body);

    like
      .save()
      .then((like) => {
        res.json(like);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // DELETE /posts/:id/friendships/:friendshipID - Delete existing friendship
  delete: async (req: any, res: any, next: any) => {
    let id = req.params.friendshipID;

    model
      .findByIdAndDelete(id, { useFindAndModify: false })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
};

export default controller;

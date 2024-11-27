import model from "../models/friend_request";
import friendship from "../models/friendship";

const controller = {
  // GET /users/:id/friendRequests - Get all friend requests for a user (as reciever)
  all: async (req: any, res: any, next: any) => {
    let userID = req.params.id;
    model
      .find({ recipient: userID })
      .populate("sender", "firstName lastName image")
      .then((friendRequests) => {
        res.json(friendRequests);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // POST /users/:id/friendRequests - Create new friend request
  create: async (req: any, res: any, next: any) => {
    let request = new model(req.body);

    request
      .save()
      .then((request) => {
        res.json(request);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // POST /users/:id/friendRequests/:friendRequestID - Accept friend request and create friendship
  accept: async (req: any, res: any, next: any) => {
    let id = req.params.friendRequestID;

    let userIDs = {};
    // Order ids to prevent duplicates
    if (req.body.sender > req.body.recipient) {
      userIDs = {
        user1: req.body.sender,
        user2: req.body.recipient,
      };
    } else {
      userIDs = {
        user1: req.body.recipient,
        user2: req.body.sender,
      };
    }

    let friendshipModel = new friendship(userIDs);

    Promise.all([
      friendshipModel.save(),
      model.findOneAndDelete({sender: req.body.sender, recipient: req.body.recipient}, { useFindAndModify: false }),
      model.findOneAndDelete({sender: req.body.recipient, recipient: req.body.sender}, { useFindAndModify: false }),
    ])
      .then((friendship) => {
        res.json(friendship);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // DELETE /users/:id/friendRequests/:friendRequestID - Delete existing friend request
  delete: async (req: any, res: any, next: any) => {
    let id = req.params.friendRequestID;

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

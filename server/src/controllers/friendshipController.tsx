import model from "../models/friendship";

const controller = {
  // GET /posts/:id/friendships - Get all friendships for a user
  all: async (req: any, res: any, next: any) => {
    let userID = req.params.id;
    model
      .find({ user1: userID })
      .then((friendships1) => {
        model
          .find({ user2: userID })
          .then((friendships2) => {
            const friendships = friendships1.concat(friendships2);
            res.json(friendships);
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

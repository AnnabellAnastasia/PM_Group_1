import model from "../models/like";

const controller = {
  // GET /posts/:id/likes - Get all likes on a post
  all: async (req: any, res: any, next: any) => {
    let postID = req.params.id;
    model
      .find({post : postID})
      .then((likes) => {
        res.json(likes);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // POST /posts/:id/likes - Create new like
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
  // DELETE /posts/:id/lieks/:likeID - Delete existing like
  delete: async (req: any, res: any, next: any) => {
    let id = req.params.likeID;

    model
      .findByIdAndDelete(id, { useFindAndModify: false })
      .then(() => {
        res.status(200);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
};

export default controller;

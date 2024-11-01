import model from "../models/comment";

const controller = {
  // GET /posts/:id/comments - Get all comments on a post
  all: async (req: any, res: any, next: any) => {
    let postID = req.params.id;

    model
      .find({post : postID})
      .populate("commenter", "firstName lastName image")
      .then((comment) => {
        res.json(comment);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // POST /posts/:id/comments - Create new comments
  create: async (req: any, res: any, next: any) => {
    let post = new model(req.body);
    console.log("post", post);

    post
      .save()
      .then((comment) => {
        res.json(comment);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // PUT /posts/:id/comments/:commentID - Update existing comment
  update: async (req: any, res: any, next: any) => {
    let comment = req.body;
    let id = req.params.commentID;

    model
      .findByIdAndUpdate(id, comment, {
        useFindAndModify: false,
        runValidators: true,
      })
      .then((comment) => {
        res.json(comment);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // DELETE /posts/:id/comments/:commentID - Delete existing comments
  delete: async (req: any, res: any, next: any) => {
    let id = req.params.commentID;
    console.log("Deleting", id);

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

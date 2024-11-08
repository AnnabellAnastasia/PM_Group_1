import model from "../models/post";
import Comment from "../models/comment"
import Like from "../models/like"

const controller = {
  // GET /posts - Get all posts
  all: async (req: any, res: any, next: any) => {
    model
      .find()
      .populate('creator', 'firstName lastName image')
      .then((posts) => {
        if (posts && posts[0]) {
          // Sort posts by newest
          posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          res.json(posts);
        } else {
          res.status(404).json("No Posts Found");
        }
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // GET /posts/:id - Get one post from ID param
  show: async (req: any, res: any, next: any) => {
    let id = req.params.id;

    model
      .findById(id)
      .then((post) => {
        if (post) {
          res.json(post);
        } else {
          res.status(404).json(`No Posts Found with ID ${req.params.id}`);
        }
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // POST /posts - Create new post
  create: async (req: any, res: any, next: any) => {
    let post = new model(req.body);

    post
      .save()
      .then((post) => {
        res.json(post);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // PUT /posts/:id - Update existing post
  update: async (req: any, res: any, next: any) => {
    let post = req.body;
    let id = req.params.id;

    model
      .findByIdAndUpdate(id, post, {
        useFindAndModify: false,
        runValidators: true,
      })
      .then((post) => {
        if (post) {
          res.json(post);
        } else {
          res.status(404).json(`No Posts Found with ID ${req.params.id}`);
        }
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // DELETE /posts/:id - Delete specific post
  delete: async (req: any, res: any, next: any) => {
    let id = req.params.id;

    Promise.all([model.findByIdAndDelete(id, { useFindAndModify: false }), Comment.deleteMany({post : id}), Like.deleteMany({post : id})])
			.then(() => {
        res.sendStatus(200);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
};

export default controller;

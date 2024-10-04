import model from "../models/post";

const controller = {
  // GET /posts - Get all posts
  all: async (req: any, res: any, next: any) => {
    model
      .find()
      .then((posts) => {
        if (posts && posts[0]) {
          res.json(posts);
        } else {
          res.status(404).json("No Posts Found");
        }
      })
      .catch((err: any) => {
        res.json({ mesage: err.message });
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
        res.json({ mesage: err.message });
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
        res.json({ mesage: err.message });
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
        res.json({ mesage: err.message });
      });
  },
  // DELETE /posts/:id - Delete specific post
  delete: async (req: any, res: any, next: any) => {
    let id = req.params.id;

    model
      .findByIdAndDelete(id, { useFindAndModify: false })
			.then((post) => {
        if (post) {
          res.json(post);
        } else {
          res.status(404).json(`No Posts Found with ID ${req.params.id}`);
        }
      })
      .catch((err: any) => {
        res.json({ mesage: err.message });
      });
  },
};

export default controller;

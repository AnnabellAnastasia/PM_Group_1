import jwt from 'jsonwebtoken';
import Post from "../models/post";
import Comment from "../models/comment";

export function userLoggedIn(req: any, res: any, next: any) {
  const token = req.cookies ? req.cookies.token : null;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.SECRET || "", (err: any, decoded: any) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.id = decoded.id;
        next();
      }
    });
  }
}

// check if user is the creator of a comment
export function isCommenter(req: any, res: any, next: any) {
	let id = req.params.commentID;
	Comment.findById(id)
		.then((comment) => {
			if (comment) {
				if (req.id && comment.commenter == req.id) {
					return next();
				} else {
					let err = new Error('Unauthorized to access this resource.');
					return next(err);
				}
			} else {
				let err = new Error('Cannot find a comment with ID ' + id);
				next(err);
			}
		})
		.catch((err) => next(err));
};

// check if user is the creator of a post
export function isPostCreator(req: any, res: any, next: any) {
	let id = req.params.id;
	Post.findById(id)
		.then((post) => {
			if (post) {
				if (req.id && post.creator == req.id) {
					return next();
				} else {
					let err = new Error('Unauthorized to access this resource.');
					return next(err);
				}
			} else {
				let err = new Error('Cannot find a post with ID ' + id);
				next(err);
			}
		})
		.catch((err) => next(err));
};
import model from "../models/user";
import jwt from "jsonwebtoken";

const controller: any = {
	// GET /users - Check auth
	auth: async (req: any, res: any, next: any) => {
		res.status(200).json({ user: req.id });
	},

// POST /users - Create new user
  create: async (req: any, res: any, next: any) => {
    let user = new model(req.body);
    user.image = "blank-profile-picture.png";
    user
      .save()
      .then(() => {
        console.log("Saved!");
				res.status(201)
				.json({success: "User Account Successfully Created"});
      })
      .catch((err: any) => {
				if (err.code === 11000) {
          res.status(401)
          .json({error: "Email Address has been used"});
          return;
				} else next(err);
      });
  },
	// POST /users/login - Authenticate user login
  authenticate: async (req: any, res: any, next: any) => {
    let email = req.body.email;
    let password = req.body.password;

    // Get user that matches the email
    model
      .findOne({ email })
      .then((user: any) => {
        if (user) {
					const { _id: id, firstName, lastName, image } = user;
          user.comparePassword(password).then((result: any) => {
            console.log("result", result);
            if (result) {
							const payload = { id: user._id };
							const token = jwt.sign(payload, process.env.SECRET || "", {
								expiresIn: '1h'
							});
							res.cookie('token', token, { 
								httpOnly: true, 
								maxAge: 60*60*1000, 
								secure: true,
								sameSite: 'strict',
							})
							.status(200)
							.json({user: { id, firstName, lastName, image }, success: "You Have Successfully Logged In"});
            } else {
              res.status(401).json({error: "Incorrect Password"});
            }
          });
        } else {
          res.status(401).json({error: "Email Address Not Found"});
        }
      })
      .catch((err) => next(err));
  },
	// GET /users/logout - Log user out
  logout: async (req: any, res: any, next: any) => {
		res.clearCookie("token").status(200).send("User Successfully Logged Out");
  },

	// GET /users/profile - Get info from logged in user
	profile: async (req: any, res: any, next: any) => {
    // Get user info that matches id
    model
      .findOne({ _id: req.id })
      .then((user: any) => {
        if (user) {
					const { _id: id, firstName, lastName, image } = user;
					res.json({ id, firstName, lastName, image });
        } else {
          res.status(400).send("Invalid User ID");
        }
      })
      .catch((err) => next(err));
	}
};

export default controller;

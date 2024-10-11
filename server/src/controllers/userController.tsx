import model from "../models/user";
import jwt from "jsonwebtoken";

const controller: any = {
	auth: async (req: any, res: any, next: any) => {
		res.sendStatus(200);
	},

// POST /users - Create new user
  create: async (req: any, res: any, next: any) => {
    let user = new model(req.body);
    user.image = "blank-profile-picture.png";
    user
      .save()
      .then(() => {
        console.log("Saved!");
        res.status(201).send("User Successfully Created");
      })
      .catch((err: any) => {
				if (err.code === 11000) {
					console.log(err);
					return res.status(400).send(err.errorResponse.errmsg);
				}
        next(err);
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
          user.comparePassword(password).then((result: any) => {
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
							}).sendStatus(200);
            } else {
              res.status(400).send("Password Incorrect");
            }
          });
        } else {
          res.status(400).send("Email Address Not Found");
        }
      })
      .catch((err) => next(err));
  },
	// GET /users/logout - Log user out
  logout: async (req: any, res: any, next: any) => {
    req.session.destroy((err: any) => {
      if (err) return next(err);
      else res.status(200).send("User Successfully Logged Out");
    });
  },
};

export default controller;

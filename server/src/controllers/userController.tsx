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
    console.log("user", user);
    user
      .save()
      .then(() => {
        console.log("Saved!");
        res.status(201).json({ success: "User Account Successfully Created" });
      })
      .catch((err: any) => {
        if (err.code === 11000) {
          console.log("user", err);
          res.status(401).json({ error: "Email Address has been used" });
          return;
        } else next(err);
      });
  },

  // GET /users/:id - Get info from user from ID
  show: async (req: any, res: any, next: any) => {
    let userID = req.params.id;
    // Get user info that matches id
    model
      .findOne({ _id: userID })
      .then((user: any) => {
        if (user) {
          const {
            firstName,
            lastName,
            biography,
            biographyVisibility,
            major,
            majorVisibility,
            minor,
            minorVisibility,
            concentration,
            concentrationVisibility,
            location,
            locationVisibility,
            image,
            email,
            emailVisibility,
            website,
            websiteVisibility,
            github,
            githubVisibility,
            twitter,
            twitterVisibility,
            instagram,
            instagramVisibility,
            facebook,
            facebookVisibility,
            secondaryEmail,
            secondaryEmailVisibility,
            phone,
            phoneVisibility,
            address,
            addressVisibility
          } = user;
          res.json({
            firstName,
            lastName,
            biography,
            biographyVisibility,
            major,
            majorVisibility,
            minor,
            minorVisibility,
            concentration,
            concentrationVisibility,
            location,
            locationVisibility,
            image,
            email,
            emailVisibility,
            website,
            websiteVisibility,
            github,
            githubVisibility,
            twitter,
            twitterVisibility,
            instagram,
            instagramVisibility,
            facebook,
            facebookVisibility,
            secondaryEmail,
            secondaryEmailVisibility,
            phone,
            phoneVisibility,
            address,
            addressVisibility
          });
        } else {
          res.status(400).send("Invalid User ID");
        }
      })
      .catch((err) => next(err));
  },

  // GET /users/profile - Get basic info from logged in user
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
                expiresIn: "1h",
              });
              res
                .cookie("token", token, {
                  httpOnly: true,
                  maxAge: 60 * 60 * 1000,
                  secure: true,
                  sameSite: "strict",
                })
                .status(200)
                .json({
                  user: { id, firstName, lastName, image },
                  success: "You Have Successfully Logged In",
                });
            } else {
              res.status(401).json({ error: "Incorrect Password" });
            }
          });
        } else {
          res.status(401).json({ error: "Email Address Not Found" });
        }
      })
      .catch((err) => next(err));
  },
  // GET /users/logout - Log user out
  logout: async (req: any, res: any, next: any) => {
    res.clearCookie("token").status(200).send("User Successfully Logged Out");
  },

  search: async (req: any, res: any, next: any) => {
    let searchterm = req.query.searchterm;
    console.log("searchTerm", searchterm);
    model
      .find({ $text: { $search: searchterm } })
      .then((users) => {
        if (users) {
          let returnArray = [];
          for (const user of users) {
            const { _id: id, firstName, lastName, image } = user;
            returnArray.push({ id, firstName, lastName, image });
          }
          res.json(returnArray);
        } else {
          res.status(400).json("Invalid Search");
        }
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // PUT /users/:id - Update existing user
  update: async (req: any, res: any, next: any) => {
    let user = req.body;
    let id = req.params.id;
    console.log("params", id, user);
    model
      .findByIdAndUpdate(id, user, {
        useFindAndModify: false,
        runValidators: true,
      })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json(`No Users Found with ID ${req.params.id}`);
        }
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // POST /users/:id - Upload image existing post
  image: async (req: any, res: any, next: any) => {
    let id = req.params.id;
    if (!req.file) return res.json({ message: "no file found" });

    let image = { image: req.file.filename };
    console.log("params", id, image);

    model
      .findByIdAndUpdate(id, image, {
        useFindAndModify: false,
        runValidators: true,
      })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json(`No Users Found with ID ${req.params.id}`);
        }
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
};

export default controller;

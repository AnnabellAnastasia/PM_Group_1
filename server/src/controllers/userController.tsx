import model from "../models/user";
import post from "../models/post";
import repost from "../models/repost";
import jwt from "jsonwebtoken";
import friendship from "../models/friendship";
import { Types } from "mongoose";

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
            title,
            titleVisibility,
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
            addressVisibility,
          } = user;
          res.json({
            firstName,
            lastName,
            title,
            titleVisibility,
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
            addressVisibility,
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
  // POST /users/:id - Upload image to existing user
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
      .catch((err) => next(err));
  },
  // GET /users/:id/posts - Get all posts and reposts by a user
  posts: async (req: any, res: any, next: any) => {
    let id = req.params.id;

    Promise.all([
      post
        .find({ creator: id })
        .populate("creator", "firstName lastName image"),
      repost.find({ reposter: id }).populate([
        {
          path: "post",
          populate: [
            {
              path: "creator",
              select: "firstName lastName image",
            },
          ],
        },
        { path: "reposter", select: "firstName lastName image" },
      ]),
    ])
      .then((results) => {
        const [posts, reposts] = results;
        if (posts && reposts) {
          // Sort all by newest
          let postsAndReposts = [...posts, ...reposts];
          postsAndReposts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          res.json(postsAndReposts);
        } else {
          res.status(404).json("No Posts Found");
        }
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  suggestions: async (req: any, res: any, next: any) => {
    let id = req.params.id;

    model
      .find()
      .select("firstName lastName image")
      .then((response) => {
        // res.json(JSON.stringify(users));

        friendship
        .find({ user1: id })
        .then((friendships1) => {
          const allFriendships: (string | Types.ObjectId | undefined)[] = [];
          friendships1.forEach((friend) => {
            allFriendships.push(friend.user2?.toString());
          });
  
          friendship
            .find({ user2: id })
            .then((friendships2) => {
              friendships2.forEach((friend) => {
                allFriendships.push(friend.user1?.toString());
              });

              const suggestions = response
              .filter((user) => (user._id?.toString().localeCompare(id)))
              .filter((user) => !allFriendships.includes(user._id?.toString()))
              res.json(suggestions);
            })
            .catch((err: any) => {
              res.json({ message: err.message });
            });
        })
        .catch((err: any) => {
          res.json({ message: err.message });
        });

      })
      .catch((err) => next(err));
  },

  //TODO: get rid of this
  everyUserTest: async (req: any, res: any, next: any) => {
    model
      .find()
      .then((response) => {
        let users: any[] = [];
        response.forEach((user) => {
          const { _id: id, firstName, lastName, image } = user;
          users.push({ _id: id, firstName, lastName, image });
        });
        res.json(JSON.stringify(users));
      })
      .catch((err) => next(err));
  },
};

export default controller;

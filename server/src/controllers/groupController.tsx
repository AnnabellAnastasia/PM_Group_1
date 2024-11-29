import { Types } from 'mongoose';
import model from '../models/group';
import userModel from '../models/user'

const controller = {
    //get all groups 
    all: async(req:any, res:any, next:any) => {
        model.find().then((response:any) => {
            if(response) {
                console.log("response from db", response);
                return res.json(response);
            }
        });
        
    }, 
    new: async(req:any, res:any, next:any) => {
        const {name, desc, usr} = req.body;
        if (!name || !desc || !usr) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        // const userId = new Types.ObjectId(usr);
        const data = {
            name: name, 
            description: desc, 
            members: [usr], 
            mods: [usr], 
            posts: []
        };
        model.create(data).then((response) => {
            if(response) {
                return res.json({groupId:response._id});
            }
        })
        .catch((err:any) => {
            console.error(err);
            return res.status(500).json({error: "internal error"});
        })
    }, 
    show: async(req:any, res:any, next:any) => {
        const id = req.params.id;
        model.findById(id)
        .populate("mods", "_id firstName lastName image")
        .populate("members", "_id firstName lastName image")
        .populate("posts", "body creator")
        .populate(
            {
                path: "posts",
                populate: [
                  {
                    path: "creator",
                    select: "firstName lastName image",
                  },
                ],
              },
        )
        .then((response) => {
            if(!response) {
                return res.status(204).json({error: "nothing found"});
            }
            return res.json(response);
        })
        .catch((err:any) => {
            console.error("there was an issue fetching group", err);
            return res.status(500).json({error: "internal error"});
        })
    }, 
    join: async (req: any, res: any, next: any) => {
        try {
          const { id, usr } = req.body;
          const group = await model.findById(id);
          if (!group) {
            console.error("Group not found");
            return res.status(404).json({ error: "Group not found" });
          }
          const mem = group.members.find((user) => user._id == usr)
          if(mem) {
            return res.status(204).json({message: "already exists"});
          }
          group.members.push(usr);
          const user = await userModel.findById(usr);
          if (!user || !user.members) {
            console.error("User not found or user data invalid");
            return res.status(404).json({ error: "User not found or invalid data" });
          }
          user.members.push(id);
          await group.save();
          await user.save();
      
          return res.status(200).json({ message: "User successfully joined the group" });
        } catch (err) {
          console.error("There was an issue joining a group", err);
          return res.status(500).json({ error: "Internal server error" });
        }
    
    }, 
    leave: async (req: any, res: any, next: any) => {
        try {
          const { id, usr } = req.body;
          const group = await model.findById(id);
          if (!group) {
            console.error("Group not found");
            return res.status(404).json({ error: "Group not found" });
          }
          const userIndexInGroup = group.members.indexOf(usr);
          if (userIndexInGroup > -1) {
            group.members.splice(userIndexInGroup, 1);
          } else {
            console.error("User not in group");
            return res.status(400).json({ error: "User is not a member of this group" });
          }
          const user = await userModel.findById(usr);
          if (!user || !user.members) {
            console.error("User not found or user data invalid");
            return res.status(404).json({ error: "User not found or invalid data" });
          }
          const groupIndexInUser = user.members.indexOf(id);
          if (groupIndexInUser > -1) {
            user.members.splice(groupIndexInUser, 1);
          } else {
            console.error("Group not in user's list");
            return res.status(400).json({ error: "Group is not in the user's joined groups" });
          }
          await group.save();
          await user.save();
          return res.status(200).json({ message: "User successfully left the group" });
        } catch (err) {
          console.error("There was an issue leaving the group", err);
          return res.status(500).json({ error: "Internal server error" });
        }
      }, 
    
      
}

export default controller;
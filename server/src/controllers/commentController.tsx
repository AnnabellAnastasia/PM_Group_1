/**
 * Controller functions to get the requested data from the models, c
 * reate an HTML page displaying the data, and return it to the user to view in the browser.
 */
import { models } from "mongoose";
import model from "../models/comment";
const controller = {
    // Get all comments from a specific user
    all:async (req: any, res: any, next: any) => {
        model
        .find().populate('creator')
        .then((comments)=>{
            if(comments && comments[0]){
                res.json(comments)
            }else{
                res.status(404).json("No comments Found");
            }
        })
        .catch((err: any) => {
            res.json({ message: err.message });
          });
    },
    select:async(req: any, res: any, next: any)=>{
        let commentid = req.params.id;
        model
        .findById(commentid)
        .then((comment)=>{
            if(comment){
                res.json(comment);
                // Delete comment from post
            }else{
                res.status(404).json("Comment doesn't exist");
            }
        })
    },
    create:async(req:any,res:any,next:any)=>{
        let comment = new model(req.body);
        comment
            .save()
            .then((comment)=>{
                    if(comment){
                        res.json(comment);
                }else{
                    res.status(404).json("Comment doesn't exist");
                }
        
            })
    },
};

export default controller;
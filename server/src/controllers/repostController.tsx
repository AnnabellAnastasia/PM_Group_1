import model from "../models/repost";
import postModel from "../models/post"
const controller ={
    // create a repost
    create: async(req: any, res: any, next: any)=>{
        /*repost item is derived from the request*/
        let repost = req.params.id;
        repost
        /*Saving the repost item and then printing it's json to the console*/
            .save()
            .then((repost:any)=>{
                res.json(repost);
                console.log(repost);
            })
            .catch((err: any) => {
                res.json({ message: err.message });
              });
    }

}

export default controller;
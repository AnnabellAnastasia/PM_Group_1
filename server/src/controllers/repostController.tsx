import model from "../models/repost";
const controller = {
  // create a repost
  create: async (req: any, res: any, next: any) => {
    /*repost item is derived from the request*/
    let repost = new model(req.body);
    repost
      .save()
      .then((repost: any) => {
        res.json(repost);
        console.log(repost);
        console.log("Repost controller");
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
  // DELETE /posts/:id - Delete specific repost
  delete: async (req: any, res: any, next: any) => {
    let repostID = req.params.repostID;
      model.findByIdAndDelete(repostID, { useFindAndModify: false })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err: any) => {
        res.json({ message: err.message });
      });
  },
};

export default controller;

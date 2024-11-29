import model from '../models/group';
import userModel from '../models/user'

const controller = {
    //get all groups 
    all: async(req:any, res:any, next:any) => {
        model.find().then((response:any) => {
            if(response) {
                return res.json(response);
            }
        });
        
    }, 

}

export default controller;
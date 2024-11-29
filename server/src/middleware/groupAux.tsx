import group from "../models/group"
import user from "../models/user"

export function isMod(req: any, res: any, next: any) {
	const {id, usr} = req.body;
	group.findById(id).then(
        (response:any) => {
            if(response && response.mods && response.mods.includes(usr)) {
                next();
            } else {
                res.status(401).send("unauthorized: not a moderator of this group");
            }
        }
    )
};

export function isMember(req: any, res: any, next: any) {
    console.log("is member called");
    const {id, usr} = req.body;
    console.log(id, usr);
    group.findById(id).then(
        (response:any) => {
            if(response && response.members && response.members.includes(usr)) {
                next();
            } else {
                console.log("not a member");
                console.log(response);
                res.status(401).send("unauthoried: not a member of this group");
            }
        }
    )
}

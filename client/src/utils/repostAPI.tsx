export async function fetchReposts(post:any){
    const response = await fetch(`http://localhost:8080/posts/${post}/reposts`,{
        method:"GET",
        headers: {
			"Content-Type": "application/json",
		},
		credentials: 'include'
    });
    if (!response.ok) {
		console.error(`An error has occurred: ${response.statusText}`);
		return;
	}
    const reposts = await response.json();
	if (!reposts) {
		console.warn(`No users found`);
	}
	console.log("reposts ", reposts);
	return reposts;
}

export async function createRepost(event: any,post:any, loggedInUser: string){
    const repost ={
        post:post,
        reposter:loggedInUser
    }
    let response;
    try{
        response = await fetch(`http://localhost:8080/Posts/${post}/reposts`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }catch(error){
        console.error("A problem occurred with your fetch operation: ", error);
    }

}
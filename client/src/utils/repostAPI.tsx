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

export async function createRepost(event: any, postID:any, loggedInUser: string, setPageAlert: Function, navigate: Function){
    event.preventDefault();
    const repost = {
        post: postID,
        reposter: loggedInUser
    }
    let response;
    try{
        response = await fetch(`http://localhost:8080/posts/${postID}/reposts`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(repost),
            credentials: 'include'
        })
        if (!response.ok) {
            setPageAlert({ error: response.status, success: "" });
        } else {
            console.log("Response", await response.json());
            setPageAlert({ success: "Repost Successful", error: "" });
            navigate("/posts");
        }
        return;
    } catch(error){
        console.error("A problem occurred with your fetch operation: ", error);
    }

}

export async function deleteRepost(
    postID: string,
    repostID: string,
  ) {
    let response;
    try {
      response = await fetch(`http://localhost:8080/posts/${postID}/reposts/${repostID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    }
  }
  
export async function fetchComments() {
    const response = await fetch(`http://localhost:8080/comments`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: 'include'
	});
    if (!response.ok) {
		console.error(`An error has occurred: ${response.statusText}`);
		return;
	}
	const comments = await response.json();
	if (!comments) {
		console.warn(`No users found`);
	}
	console.log("omments ", comments);
	return comments;
}

export async function createComment(event: any, newComment: string, loggedInUser: string){
    const comment = {
        body: newComment,
        creator: loggedInUser
    };
    let response;
    try{
        response = await fetch(`http://localhost:8080/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
    }
}
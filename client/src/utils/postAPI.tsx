export async function fetchPosts() {
	const response = await fetch(`http://localhost:8080/posts`, {
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
	const posts = await response.json();
	if (!posts) {
		console.warn(`No users found`);
	}
	console.log("posts ", posts);
	return posts;
}

export async function submitPost(event: any, newPost: string, loggedInUser: string) {
	const post = { 
		body: newPost,
		creator: loggedInUser
	};
	let response;
	try {
		response = await fetch(`http://localhost:8080/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(post),
			credentials: 'include'
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	} catch (error) {
		console.error("A problem occurred with your fetch operation: ", error);
	}
}

export async function deletePost(postID: string) {
	const response = await fetch(`http://localhost:8080/posts/${postID}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: 'include'
	});
	if (!response.ok) {
		console.error(`An error has occurred: ${response.statusText}`);
		return;
	}
	const posts = await response.json();
	if (!posts) {
		console.warn(`No users found`);
	}
	console.log("posts ", posts);
	return posts;
}
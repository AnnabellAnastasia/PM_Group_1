export async function fetchPosts() {
  try {
    const response = await fetch(`http://localhost:8080/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
  } catch (err) {
    console.error(err);
  }
}

export async function fetchUserPostsAndReposts(userID: string) {
  if (!userID) return;

  try {
    const response = await fetch(`http://localhost:8080/users/${userID}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
  } catch (err) {
    console.error(err);
  }
}

export async function submitPost(
  event: any,
  newPost: string,
  loggedInUser: string
) {
  const post = {
    body: newPost,
    creator: loggedInUser,
  };
  let response;
  try {
    response = await fetch(`http://localhost:8080/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function updatePost(
  postID: string,
  postBody: string
) {
  const post = {
    body: postBody
  };
  let response;
  try {
    response = await fetch(`http://localhost:8080/posts/${postID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function deletePost(
  postID: string,
) {
  let response;
  try {
    response = await fetch(`http://localhost:8080/posts/${postID}`, {
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


export async function getLikes(postID: string) {
  let response;
  try {
    response = await fetch(`http://localhost:8080/posts/${postID}/likes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const likes = await response.json();
    return likes;
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function likePost(postID: string, userID: string) {
  const like = {
    liker: userID,
    post: postID,
  };
  let response;
  try {
    response = await fetch(`http://localhost:8080/posts/${postID}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(like),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function unlikePost(postID: string, likeID: string) {
  let response;
  try {
    response = await fetch(
      `http://localhost:8080/posts/${postID}/likes/${likeID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function getComments(postID: string) {
  let response;
  try {
    response = await fetch(`http://localhost:8080/posts/${postID}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function leaveComment(
  postID: string,
  userID: string,
  commentBody: string
) {
  const comment = {
    commenter: userID,
    post: postID,
    body: commentBody,
  };
  console.log("new comment", comment);
  let response;
  try {
    response = await fetch(`http://localhost:8080/posts/${postID}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function updateComment(
  postID: string,
  commentID: string,
  commentBody: string
) {
  const comment = {
    body: commentBody
  };
  let response;
  try {
    response = await fetch(`http://localhost:8080/posts/${postID}/comments/${commentID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function deleteComment(
  postID: string,
  commentID: string
) {
  let response;
  try {
    response = await fetch(`http://localhost:8080/posts/${postID}/comments/${commentID}`, {
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

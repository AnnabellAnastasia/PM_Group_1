import { useState, useEffect } from "react";
import Post from './Post'

function PostFeed() {
  const [postFeed, setPostFeed] = useState<any>([]);
  const [newPost, setNewPost] = useState("");
	const [loggedInUser, setLoggedInUser] = useState("66ec488ed6eba1e237b65bf1");

  // Fetch user data
  async function fetchPosts() {
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
    setPostFeed(posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function submitPost(event: any) {
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

  return (
    <>
      <form onSubmit={submitPost}>
        <label className="hidden" htmlFor="postEntry">
          Post Entry
        </label>
        <input
          type="text"
          name="postEntry"
					className="post-entry"
          placeholder="Create A Post!"
          value={newPost}
          onChange={(event) => setNewPost(event.target.value)}
        />
        <input className="post-submit" type="submit"></input>
      </form>
      <div className="postFeed">
        {postFeed && postFeed.map(function (post: any) {
          return <Post key={post._id} postObj={post}/>;
        })}
      </div>
    </>
  );
}

export default PostFeed;

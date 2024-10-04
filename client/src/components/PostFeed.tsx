import { useState, useEffect } from "react";

function PostFeed() {
  const [postFeed, setPostFeed] = useState<any>([]);
  const [newPost, setNewPost] = useState("");

  // Fetch user data
  async function fetchUsers() {
    const response = await fetch(`http://localhost:8080/posts`);
    if (!response.ok) {
      console.error(`An error has occurred: ${response.statusText}`);
      return;
    }
    const posts = await response.json();
    if (!posts) {
      console.warn(`No users found`);
    }
    setPostFeed(posts);
    console.log("posts", posts);
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    console.log(newPost);
  }, [newPost]);

  // Submit function for username form
  async function submitUser(event: any) {
    const post = { body: newPost };
    let response;
    try {
      response = await fetch(`http://localhost:8080/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
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
      <form onSubmit={submitUser}>
        <label className="hidden" htmlFor="postEntry">Post Entry</label>
        <input
          type="text"
          name="postEntry"
          placeholder="Create A Post!"
          value={newPost}
          onChange={(event) => setNewPost(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {postFeed.map(function (post: any) {
          return <li key={post._id}>{post.body}</li>;
        })}
      </ul>
    </>
  );
}

export default PostFeed;

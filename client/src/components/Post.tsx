import { useState, useEffect } from "react";

function Post({ postObj }: any) {
  const [editMode, setEditMode] = useState(false);
  const [postBody, setPostBody] = useState(postObj.body);

  useEffect(() => {
    console.log(editMode);
  }, [editMode]);

  // Edit post function
  async function postUpdate(newPost: any, id: any) {
    const post = {
      body: newPost,
    };
    let response;
    try {
      response = await fetch(`http://localhost:8080/posts/${id}`, {
        method: "PUT",
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

  // Delete post function
  async function postDelete(id: any) {
    let response;
    try {
      response = await fetch(`http://localhost:8080/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    }
  }

  return (
    <div className="post" key={postObj._id}>
      <div className="post-user">
        <div className="pic-container">
          <img
            className="profile-pic"
            src={"../images/" + postObj.creator.image}
            alt={`${postObj.creator.username}`}
          ></img>
        </div>
        <div className="user-display-name">
          {postObj.creator.firstName}&nbsp;{postObj.creator.lastName}
        </div>
      </div>
      {editMode ? (
        <form onSubmit={() => postUpdate(postBody, postObj._id)}>
          <input
            type="text"
            name="postEdit"
            className=""
            value={postBody}
            onChange={(event) => setPostBody(event.target.value)}
          />
          <input
            className="post-submit"
            type="submit"
            value="Submit Changes"
          ></input>
        </form>
      ) : (
        <div className="post-body">{postObj.body}</div>
      )}
      {editMode ? (
        <></>
      ) : (
        <div className="post-options">
          <button className="post-button" onClick={() => setEditMode(true)}>
            Edit
          </button>
          <form onSubmit={() => postDelete(postObj._id)}>
            <input className="post-button" type="submit" value="Delete"></input>
          </form>
        </div>
      )}
    </div>
  );
}
export default Post;

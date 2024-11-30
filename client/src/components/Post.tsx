import React, { useState, useEffect } from "react";

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
    try {
      const response = await fetch(`http://localhost:8080/posts/${id}`, {
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
    try {
      const response = await fetch(`http://localhost:8080/posts/${id}`, {
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
            value={postBody}
            onChange={(event) => setPostBody(event.target.value)}
            style={{
              marginBottom: "10px",
              padding: "8px",
              width: "100%",
              fontSize: "16px",
            }}
          />
          <input
            type="submit"
            value="Submit Changes"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          />
        </form>
      ) : (
        <div className="post-body">{postObj.body}</div>
      )}
      {!editMode && (
        <div
          className="post-options"
          style={{
            margin: "20px",
            display: "flex",
            gap: "20px", // Adds spacing between buttons
          }}
        >
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 16px", // Padding added here
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <form onSubmit={() => postDelete(postObj._id)}>
            <input
              type="submit"
              value="Delete"
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "10px 16px", // Padding added here
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;

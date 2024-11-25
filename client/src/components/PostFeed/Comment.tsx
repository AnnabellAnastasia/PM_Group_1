import { useState, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import { updateComment, deleteComment } from "../../utils/postAPI";
import { processDate } from "../../utils/tools";
import "./Comment.css";

function Comment({ commentObj, processComments }: any) {
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [commentEditBody, setCommentEditBody] = useState(commentObj.body);

  function handleActivateEditMode() {
    setCommentEditBody(commentObj.body);
    setEditMode(true);
  }

  async function handleSubmitCommentEdits(
    postID: string,
    commentID: string,
    commentBody: string
  ) {
    await updateComment(postID, commentID, commentBody);
    setEditMode(false);
    processComments();
  }

  async function handleDeleteComment(postID: string, commentID: string) {
    await deleteComment(postID, commentID);
    processComments();
  }

  return (
    <div className="comment">
      <div className="comment-header">
        <img
          src={`http://localhost:8080/images/${
            commentObj.commenter.image
              ? commentObj.commenter.image
              : "blank-profile-picture.png"
          }`}
          alt={`${commentObj.commenter.firstName} ${commentObj.commenter.lastName}'s profile`}
          className="comment-profile-image"
        />
        <div className="comment-info">
          <a
            className="creator-name"
            href={`/account/${commentObj.commenter._id}`}
          >
            <h3>
              {commentObj.commenter.firstName}&nbsp;
              {commentObj.commenter.lastName}
            </h3>
          </a>
          <span>{processDate(commentObj.createdAt)}</span>
        </div>
        {user.id === commentObj.commenter._id && !editMode ? (
          <div className="comment-actions">
            <button onClick={() => handleActivateEditMode()}>Edit</button>
            <button
              onClick={() =>
                handleDeleteComment(commentObj.post, commentObj._id)
              }
            >
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {editMode ? (
        <div className="comment-edit">
          <input
            className="comment-edit-entry"
            value={commentEditBody}
            type="text"
            placeholder="Edit comment..."
            onChange={(event) => setCommentEditBody(event.target.value)}
          />
          <button
            onClick={() => setEditMode(false)}
            className="comment-edit-cancel"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              handleSubmitCommentEdits(
                commentObj.post,
                commentObj._id,
                commentEditBody
              )
            }
            className="comment-edit-submit"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="comment-content">{commentObj.body}</div>
      )}
    </div>
  );
}

export default Comment;

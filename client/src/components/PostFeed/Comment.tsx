import { useState, useContext } from "react";
import { UserContext } from "../ContextWrapper";
import { updateComment, deleteComment } from "../../utils/postAPI";
import { processDate } from "../../utils/tools";
import { Form, Button, ButtonGroup, InputGroup } from "react-bootstrap";
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
        <div className="comment-info">
          <img
            src={`http://localhost:8080/images/${
              commentObj.commenter.image
                ? commentObj.commenter.image
                : "blank-profile-picture.png"
            }`}
            alt={`${commentObj.commenter.firstName} ${commentObj.commenter.lastName}'s profile`}
            className="commenter-profile-image"
          />
          <div className="commenter-info">
            <a
              className="commenter-name"
              href={`/account/${commentObj.commenter._id}`}
            >
              <h3>
                {commentObj.commenter.firstName}&nbsp;
                {commentObj.commenter.lastName}
              </h3>
            </a>
            <span>{processDate(commentObj.createdAt)}</span>
          </div>
        </div>
        {user.id === commentObj.commenter._id && !editMode ? (
          <ButtonGroup className="comment-controls">
            <Button variant="light" onClick={() => handleActivateEditMode()}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Button
              variant="light"
              onClick={() =>
                handleDeleteComment(commentObj.post, commentObj._id)
              }
            >
              <i className="fa-solid fa-trash-can"></i>
            </Button>
          </ButtonGroup>
        ) : (
          <></>
        )}
      </div>
      {editMode ? (
        <InputGroup className="comment-edit">
          <Form.Control
            size="sm"
            value={commentEditBody}
            type="text"
            placeholder="Edit comment..."
            onChange={(event) => setCommentEditBody(event.target.value)}
          />
          <Button variant="outline-primary" onClick={() => setEditMode(false)}>
            <i className="fa-solid fa-xmark"></i>
          </Button>
          <Button
            variant="outline-primary"
            onClick={() =>
              handleSubmitCommentEdits(
                commentObj.post,
                commentObj._id,
                commentEditBody
              )
            }
          >
            <i className="fa-solid fa-check"></i>
          </Button>
        </InputGroup>
      ) : (
        <div className="comment-content">{commentObj.body}</div>
      )}
    </div>
  );
}

export default Comment;

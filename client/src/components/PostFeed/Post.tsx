import React, { useContext, useEffect, useState } from "react";
import { UserContext, AlertContext } from "../ContextWrapper";
import {
  updatePost,
  deletePost,
  getLikes,
  likePost,
  unlikePost,
  getComments,
  leaveComment,
} from "../../utils/postAPI";
import { processDate } from "../../utils/tools";
import Comment from "./Comment";
import { Form, Button, ButtonGroup, InputGroup, Card } from "react-bootstrap";
import { createRepost, deleteRepost } from "../../utils/repostAPI";
import { useNavigate } from "react-router-dom";

import "./Post.css";
import IsLoggedIn from "../Auth/IsLoggedIn";

// interface PostProps {
//     profileImage: string;
//     name: string;
//     jobTitle: string;
//     timePosted: string;
//     content: string;
//     jobLink?: string;
//     reactionsCount: number;
//     commentsCount: number;
//     repostsCount: number;
// }

function Post({ postObj, repostObj, getAllPosts, postIndex, }: any) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setPageAlert } = useContext(AlertContext);
  const [editMode, setEditMode] = useState(false);
  const [likeID, setLikeID] = useState("");
  const [likeTotal, setLikeTotal] = useState(0);
  const [recentLiker, setRecentLiker] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [postEditBody, setPostEditBody] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [showComments, setShowComments] = useState(false);

  async function processLikes() {
    const likes = await getLikes(postObj._id);

    if (!likes || likes.length < 1) {
      setLikeTotal(0);
      setRecentLiker("");
      setLikeID("");
      return;
    }
    console.log("likes", likes);
    setLikeTotal(likes.length);
    setRecentLiker(`${likes[0].liker.firstName} ${likes[0].liker.lastName}`);

    let flag = true;
    for (const like of likes) {
      if (like.liker._id === user.id) {
        setLikeID(like._id);
        flag = false;
      }
    }
    if (flag) setLikeID("");
  }

  async function processComments() {
    setAllComments(await getComments(postObj._id));
  }

  useEffect(() => {
    processLikes();
    processComments();
  }, [postObj._id]);

  useEffect(() => {
    console.log("likeTotal", likeTotal);
  }, [likeTotal]);

  function handleActivateEditMode() {
    setPostEditBody(postObj.body);
    setEditMode(true);
  }

  async function handleSubmitPostEdits(postID: string, postBody: string) {
    await updatePost(postID, postBody);
    setEditMode(false);
    await getAllPosts();
  }

  async function handleDeletePost(postID: string) {
    await deletePost(postID);
    await getAllPosts();
  }

  async function handleDeleteRepost(postID: string, repostID: string) {
    await deleteRepost(postID, repostID);
    await getAllPosts();
  }

  async function handleLikePost(postID: string, userID: string) {
    await likePost(postID, userID);
    await processLikes();
  }

  async function handleUnlikePost(postID: string, likeID: string) {
    await unlikePost(postID, likeID);
    await processLikes();
  }

  async function handleCreateRepost(e: any, postID: string, userID: string, setPageAlert: Function, navigate: Function) {
    await createRepost(e, postID, userID, setPageAlert, navigate)
    await getAllPosts();
  }

  async function handleLeaveComment(
    postID: string,
    userID: string,
    commentBody: string
  ) {
    await leaveComment(postID, userID, commentBody);
    await processComments();
    setCommentBody("");
    setShowComments(true);
    await getAllPosts();
  }

  function renderLikeCount(likeTotal: number, recentLiker: string) {
    if (likeTotal === 1) return `${recentLiker} likes this`;
    if (likeTotal === 2) return `${recentLiker} and 1 other`;
    if (likeTotal > 2) return `${recentLiker} and ${likeTotal - 1} others`;
    else return "0";
  }

  return (
    <Card className="post">
      {repostObj ? (
        <Card.Header className="repost-header">
          <div className="repost-info">
            <h4>
              <img
                src={`http://localhost:8080/images/${
                  repostObj.reposter.image ? repostObj.reposter.image : "blank-profile-picture.png"
                }`}
                alt={`${repostObj.reposter.firstName} ${repostObj.reposter.lastName}'s profile`}
                className="reposter-profile-image"
              />
              <a
                className="reposter-name"
                href={`/account/${repostObj.reposter._id}`}
              >
                {repostObj.reposter.firstName}&nbsp;{repostObj.reposter.lastName}
              </a>
              <span> reposted this {processDate(repostObj.createdAt)}</span>
            </h4>
          </div>
          {user.id === repostObj.reposter._id && !editMode ? (
            <span>
              <Button
                variant="light"
                onClick={() => handleDeleteRepost(postObj._id, repostObj._id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            </span>
          ) : (
            <></>
          )}
        </Card.Header>
      ) : (
        <></>
      )}
      <Card.Header className="post-header">
        <div className="post-info">
          <img
            src={`http://localhost:8080/images/${
              postObj.creator.image
                ? postObj.creator.image
                : "blank-profile-picture.png"
            }`}
            alt={`${postObj.creator.firstName} ${postObj.creator.lastName}'s profile`}
            className="creator-profile-image"
          />
          <div className="creator-info">
            <a
              className="creator-name"
              href={`/account/${postObj.creator._id}`}
            >
              <h3>
                {postObj.creator.firstName}&nbsp;{postObj.creator.lastName}
              </h3>
            </a>
            <span>{processDate(postObj.createdAt)}</span>
          </div>
        </div>

        {user.id === postObj.creator._id && !editMode ? (
          <ButtonGroup className="post-controls">
            <Button variant="light" onClick={() => handleActivateEditMode()}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Button
              variant="light"
              onClick={() => handleDeletePost(postObj._id)}
            >
              <i className="fa-solid fa-trash-can"></i>
            </Button>
          </ButtonGroup>
        ) : (
          <></>
        )}
      </Card.Header>
      <Card.Body className="post-content pt-0">
        {editMode ? (
          <InputGroup className="post-edit">
            <Form.Control
              value={postEditBody}
              type="text"
              placeholder="Edit post..."
              onChange={(event) => setPostEditBody(event.target.value)}
            />
            <Button
              variant="outline-primary"
              onClick={() => setEditMode(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleSubmitPostEdits(postObj._id, postEditBody)}
            >
              <i className="fa-solid fa-check"></i>
            </Button>
          </InputGroup>
        ) : (
          <p>{postObj.body}</p>
        )}
        {/* {jobLink && (
                    <div className="job-card">
                        <a href={jobLink} target="_blank" rel="noopener noreferrer">
                            <div className="job-card-content">
                                <h4>View Job</h4>
                                <p>Open Rank-Associate Professor or Full Professor</p>
                                <p>Georgia Institute of Technology</p>
                            </div>
                        </a>
                    </div>
                )} */}
      </Card.Body>
      <Card.Text className="post-reactions my-0">
        <span>
          <i className="fa-regular fa-thumbs-up"></i>{" "}
          {renderLikeCount(likeTotal, recentLiker)}
        </span>
        <span>
          {allComments && allComments.length ? allComments.length : 0} comment
          {allComments && allComments.length === 1 ? "" : "s"}
        </span>
      </Card.Text>

      <Card.Text className="post-actions my-0">
        {likeID ? (
          <button onClick={() => handleUnlikePost(postObj._id, likeID)}>
            <i className="fa-regular fa-thumbs-down"></i> Unlike
          </button>
        ) : (
          <button onClick={() => handleLikePost(postObj._id, user.id)}>
            <i className="fa-regular fa-thumbs-up"></i> Like
          </button>
        )}
        <button
          onClick={() => {
            setShowComments(!showComments);
            document.getElementById(`post-comment-entry-${postIndex}`)?.focus();
          }}
        >
          <i className="fa-regular fa-comment-dots"></i> Comment
        </button>
        <button
          onClick={(e) => handleCreateRepost(e, postObj._id, user.id, setPageAlert, navigate)}
          type="submit"
        >
          <i className="fa-solid fa-repeat"></i> Repost
        </button>
      </Card.Text>
      <Card.Body className="post-comment">
        {showComments
          ? allComments &&
            allComments.map(function (comment: any) {
              return (
                <Comment
                  key={comment._id}
                  commentObj={comment}
                  processComments={processComments}
                />
              );
            })
          : allComments &&
            allComments[0] && (
              <Comment
                commentObj={allComments[allComments.length - 1]}
                processComments={processComments}
              />
            )}
        <InputGroup>
          <Form.Control
            id={`post-comment-entry-${postIndex}`}
            size="sm" 
            value={commentBody}
            type="text"
            placeholder="Leave a comment..."
            onChange={(event) => setCommentBody(event.target.value)}
          />
          <Button
            onClick={() =>
              handleLeaveComment(postObj._id, user.id, commentBody)
            }
            type="submit"
          >
            <i className="fa-solid fa-share-from-square"></i>
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
}

export default Post;

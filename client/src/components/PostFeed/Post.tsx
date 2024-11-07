import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../ContextWrapper";
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
import "./Post.css";

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

function Post({ postObj, getAllPosts }: any) {
  const { user } = useContext(UserContext);
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
    setLikeTotal(likes.length);
    if (likes[0])
      setRecentLiker(`${likes[0].liker.firstName} ${likes[0].liker.lastName}`);
    else setRecentLiker("");

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

  function handleActivateEditMode() {
    setPostEditBody(postObj.body);
    setEditMode(true);
  }

  async function handleSubmitPostEdits(postID: string, postBody: string) {
    await updatePost(postID, postBody);
    setEditMode(false);
    getAllPosts();
  }

  async function handleDeletePost(postID: string) {
    await deletePost(postID);
    getAllPosts();
  }

  async function handleLikePost(postID: string, userID: string) {
    await likePost(postID, userID);
    await processLikes();
  }

  async function handleUnlikePost(postID: string, likeID: string) {
    await unlikePost(postID, likeID);
    await processLikes();
  }

  async function handleLeaveComment(
    postID: string,
    userID: string,
    commentBody: string
  ) {
    await leaveComment(postID, userID, commentBody);
    await processComments();
    setShowComments(true);
  }

  function renderLikeCount(likeTotal: number, recentLiker: string) {
    if (likeTotal === 1) return `${recentLiker} likes this`;
    if (likeTotal === 2) return `${recentLiker} and 1 other`;
    if (likeTotal > 2) return `${recentLiker} and ${likeTotal - 1} others`;
    else return "0";
  }

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={`http://localhost:8080/images/${
            postObj.creator.image
              ? postObj.creator.image
              : "blank-profile-picture.png"
          }`}
          alt={`${postObj.creator.firstName} ${postObj.creator.lastName}'s profile`}
          className="profile-image"
        />
        <div className="post-info">
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
      <div className="post-content">
        {editMode ? (
          <div className="post-edit">
            <input
              className="post-edit-entry"
              value={postEditBody}
              type="text"
              placeholder="Edit post..."
              onChange={(event) => setPostEditBody(event.target.value)}
            />
            <button
              onClick={() => setEditMode(false)}
              className="post-edit-cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmitPostEdits(postObj._id, postEditBody)}
              className="post-edit-submit"
            >
              Submit
            </button>
          </div>
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
      </div>
      <div className="post-reactions">
        <span>
          <i className="fa-regular fa-thumbs-up"></i>{" "}
          {renderLikeCount(likeTotal, recentLiker)}
        </span>
        {/* <span>{} reposts</span> */}
      </div>
      <div className="post-actions">
        {likeID ? (
          <button onClick={() => handleUnlikePost(postObj._id, likeID)}>
            Unlike
          </button>
        ) : (
          <button onClick={() => handleLikePost(postObj._id, user.id)}>
            Like
          </button>
        )}
        {allComments.length ? (
          <button onClick={() => setShowComments(!showComments)}>
            Comments ({allComments.length})
          </button>
        ) : (
          <button
            onClick={() =>
              document
                .getElementById(`post-comment-entry-${postObj._id}`)
                ?.focus()
            }
          >
            Comment
          </button>
        )}
        {user.id === postObj.creator._id && !editMode ? (
          <>
            <button onClick={() => handleActivateEditMode()}>Edit</button>
            <button onClick={() => handleDeletePost(postObj._id)}>
              Delete
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="post-comment">
        {showComments ? (
          allComments &&
          allComments.map(function (comment: any) {
            return (
              <Comment
                key={comment._id}
                commentObj={comment}
                processComments={processComments}
              />
            );
          })
        ) : (
          <></>
        )}
        <input
          id={`post-comment-entry-${postObj._id}`}
          className="post-comment-entry"
          value={commentBody}
          type="text"
          placeholder="Add a comment..."
          onChange={(event) => setCommentBody(event.target.value)}
        />
        <button
          onClick={() => handleLeaveComment(postObj._id, user.id, commentBody)}
          type="submit"
          className="post-comment-submit"
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default Post;

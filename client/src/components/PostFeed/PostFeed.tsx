import React from 'react';
import Post from "./Post";
import "./Post.css";

function PostFeed({ postFeed, getAllPosts }: any) {

  return (
    <div className="post-feed">
      {postFeed &&
        postFeed[0] &&
        postFeed.map((post: any, index: any) => {
          if (post.reposter) {
            const repostObj = {
              _id: post._id,
              reposter: post.reposter,
              createdAt: post.createdAt,
              updatedAt: post.updatedAt,
            }
            console.log("repostObj", repostObj);
            return <Post key={post._id} postObj={post.post} repostObj={repostObj} getAllPosts={getAllPosts} postIndex={index} />
          } else {
            return <Post key={post._id} postObj={post} getAllPosts={getAllPosts} postIndex={index} />
          }
        })}
    </div>
  );
}

export default PostFeed;

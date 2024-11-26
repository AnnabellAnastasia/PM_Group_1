import React from 'react';
import Post from "./Post";
import "./Post.css";

function PostFeed({ postFeed, getAllPosts }: any) {

  return (
    <div className="post-feed">
      {postFeed &&
        postFeed[0] &&
        postFeed.map((post: any) => (
          <Post key={post._id} postObj={post} getAllPosts={getAllPosts} />
        ))}
    </div>
  );
}

export default PostFeed;

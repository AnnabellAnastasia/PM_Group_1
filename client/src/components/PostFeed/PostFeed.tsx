import { useState, useEffect, useContext } from "react";
import { fetchPosts, submitPost } from "../../utils/postAPI";
import { UserContext } from '../ContextWrapper';
import Post from './Post'
import './Post.css';
import OnlineFriends from './OnlineFriends';

function PostFeed() {
  const [postFeed, setPostFeed] = useState<any>([]);
  const [newPost, setNewPost] = useState("");
  const { user } = useContext(UserContext);

  const dummyFriends = [
    { id: "1", firstName: "Alice", lastName: "Doe", image: "profile1.png" },
    { id: "2", firstName: "Bob", lastName: "Smith", image: "profile2.png" },
    // Add more friends as needed
  ];

  async function getAllPosts() {
    setPostFeed(await fetchPosts());
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  async function handlePostSubmit(event: any) {
    await submitPost(event, newPost, user.id);
  }

  return (
    <div className="post-feed-container">
      <div className="post-feed-content">
        <form className="post-form" onSubmit={(event) => handlePostSubmit(event)}>
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
          <input className="post-submit" type="submit" />
        </form>
        <div className="post-feed">
          {postFeed && postFeed[0] && postFeed.map((post: any) => (
            <Post key={post._id} postObj={post} getAllPosts={getAllPosts} />
          ))}
        </div>
      </div>
      <OnlineFriends friends={dummyFriends} onChatClick={(friendId) => console.log(`Chat with friend ${friendId}`)} />
    </div>
  );
}

export default PostFeed;

// import React from 'react';
// import Post from '../PostFeed/Post';
// import './Post.css';

// const PostPage: React.FC = () => {
//     const posts = [
//         {
//             profileImage: 'https://example.com/profile.jpg',
//             name: 'Annabella Wilkins',
//             jobTitle: 'Machine Learning Engineer at Google',
//             timePosted: '3d',
//             content: '...',
//             jobLink: 'https://example.com/job-posting',
//             reactionsCount: 45,
//             commentsCount: 1,
//             repostsCount: 4,
//         },
//         {
//             profileImage: 'https://example.com/profile.jpg',
//             name: 'Annabella Wilkins',
//             jobTitle: 'Machine Learning Engineer at Google',
//             timePosted: '3d',
//             content: '...',
//             jobLink: 'https://example.com/job-posting',
//             reactionsCount: 45,
//             commentsCount: 1,
//             repostsCount: 4,
//         },
        
//     ];

//     return (
//         <div className="post-page">
//             {posts.map((post, index) => (
//                 <Post key={index} {...post} />
//             ))}
//         </div>
//     );
// };

// export default PostPage;

import { useState, useEffect, useContext } from "react";
import { fetchPosts, submitPost } from "../../utils/postAPI";
import { UserContext } from '../ContextWrapper';
import Post from './Post'

function PostFeed() {
  const [postFeed, setPostFeed] = useState<any>([]);
  const [newPost, setNewPost] = useState("");
	const { user } = useContext(UserContext);

	useEffect(() => {
		const getAllPosts = async () => {
    	setPostFeed(await fetchPosts());
		}
		getAllPosts();
  }, []);

	useEffect(() => {
		console.log("new post", newPost);
	}, [newPost]);

	async function handlePostSubmit(event: any) {
		await submitPost(event, newPost, user.id);
	}

  return (
    <>
      <form onSubmit={(event) => handlePostSubmit(event)}>
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
        <input className="post-submit" type="submit"></input>
      </form>
      <div className="postFeed">
        {postFeed && postFeed.map(function (post: any) {
          return <Post key={post._id} postObj={post}/>;
        })}
      </div>
    </>
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

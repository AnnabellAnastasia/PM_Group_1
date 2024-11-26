import { useState, useEffect, useContext } from "react";
import { fetchPosts, submitPost } from "../../utils/postAPI";
import { UserContext } from "../ContextWrapper";
import PostFeed from "../PostFeed/PostFeed";
import "./MainPage.css";
import OnlineFriends from "./OnlineFriends";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";

function MainPage() {
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
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form
            className="post-form mt-3"
            onSubmit={(event) => handlePostSubmit(event)}
          >
            <Form.Label className="hidden" htmlFor="postEntry">
              Post Entry
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                name="postEntry"
                placeholder="Create A Post!"
                value={newPost}
                onChange={(event) => setNewPost(event.target.value)}
              />
              <Button type="submit">
                <i className="fa-solid fa-share-from-square"></i>
              </Button>
            </InputGroup>
          </Form>
          <PostFeed postFeed={postFeed} getAllPosts={getAllPosts} />
        </Col>
      </Row>
      <OnlineFriends
        friends={dummyFriends}
        onChatClick={(friendId) => console.log(`Chat with friend ${friendId}`)}
      />
    </Container>
  );
}

export default MainPage;

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

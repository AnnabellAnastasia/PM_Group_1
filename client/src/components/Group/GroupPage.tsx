import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import "./GroupPage.css";
import {
  deleteGroup,
  joinGroup,
  leaveGroup,
  showGroup,
} from "../../utils/groupAPI";
import { UserContext } from "../ContextWrapper";
import Post from "../Post";
import { submitGroupPost, submitPost } from "../../utils/postAPI";

const GroupPage = () => {
  const [group, setGroup] = useState<any>();
  const { groupId } = useParams(); // Get groupId from URL
  const { user } = useContext(UserContext);
  const [newPost, setNewPost] = useState("");
  const [isModerator, setIsModerator] = useState<boolean>();
  const [isMember, setIsMember] = useState<boolean>();

  useEffect(() => {
    console.log("get all details called");
    const getDetails = async () => {
      console.log("api called");
      await showGroup(groupId).then((response) => {
        if (response) {
          console.log("response", response);
          setGroup(response);
        }
      });
    };
    getDetails();
  }, []);

  useEffect(() => {
    if(!group) return;
    const isMember = group.members.some((mem: any) => mem._id == user.id);
    const isMod = group.mods.some((mod: any) => mod._id === user.id);
    if (isMod) setIsModerator(true);
    if (isMember) setIsMember(true);
  }, [group]);

  const navigate = useNavigate();

  async function handlePostSubmit(event: any) {
    // event.preventDefault();
    await submitGroupPost(newPost, user.id, groupId);
  }

  const handleJoin = (event: any) => {
    event.preventDefault();
    console.log("join called");
    const id = event.target.getAttribute("data-key");
    joinGroup(id, user.id).then((res: any) => {
      if (res == 200) {
        console.log("joined");
        navigate(`/group/${id}`);
      } else {
      }
    });
  };

  const handleLeave = (event: any) => {
    console.log("leave called");
    const id = event.target.getAttribute("data-key");
    leaveGroup(id, user.id).then((res: any) => {
      if (res == 200) {
        console.log("left");
        navigate(`/group`);
      }
    });
  };

  const getAllPosts = async () => {
    return await showGroup(groupId);
  };

  // const g = groups.find((g) => g.id === parseInt(groupId || '', 10));

  if (!group) {
    return (
      <Container className="mt-4">
        <h3>Group Not Found</h3>
      </Container>
    );
  }

  const handleDelete = async () => {
    await deleteGroup(groupId, user.id);
    navigate("/group");
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center display-4">
                {group.name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {group.description}
              </Card.Subtitle>
              <hr />
              <Card.Text>
                <strong>Administrators:</strong>{" "}
                {group.mods.map((mod: any) => {
                  return mod.firstName + " " + mod.lastName;
                })}
              </Card.Text>
              <Card.Text>
                <strong>Members Count:</strong> {group.members.length}
              </Card.Text>
              <h5 className="mt-4">Members</h5>
              <ul>
                {group.members.map((member: any) => (
                  <li key={member._id}>{member.firstName}</li>
                ))}
              </ul>
              {isModerator && (
                <Button
                  variant="primary"
                  className="me-2 "
                  onClick={handleDelete}
                >
                  Delete Group
                </Button>
              )}
              {isMember ? (
                <Button
                  variant="primary"
                  data-key={group._id}
                  onClick={handleLeave}
                >
                  Leave Group
                </Button>
              ) : (
                <Button
                  variant="primary"
                  data-key={group._id}
                  onClick={handleJoin}
                >
                  Join Group
                </Button>
              )}
              <Card.Text>
                <h5 className="mt-4">Posts</h5>
                <Form
                  className="post-form mt-3"
                  onSubmit={(event) => handlePostSubmit(event)}
                >
                  <Form.Label className="hidden" htmlFor="postEntry">
                    Post Entry
                  </Form.Label>
                  <InputGroup className="create-post">
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
                {group.posts &&
                  group.posts.map((post: any, index: any) => {
                    return (
                      <Post
                        postObj={post}
                        key={post._id}
                        index={index}
                        getAllPosts={getAllPosts}
                      ></Post>
                    );
                  })}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GroupPage;

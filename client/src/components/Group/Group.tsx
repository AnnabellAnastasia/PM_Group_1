import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import "./Group.css";
import { fetchAllGroups, joinGroup, leaveGroup, newGroup } from "../../utils/groupAPI";
import { AlertContext, UserContext } from "../ContextWrapper";
import { Navigate, useNavigate } from "react-router-dom";

// const groups = [
//   {
//     id: 1,
//     name: 'React Developers',
//     description: 'A group for React enthusiasts to share knowledge and resources.',
//     membersCount: 1500,
//     administrator: {
//       id: 'admin123',
//       name: 'John Doe'
//     },
//     members: [
//       { id: 'user1', name: 'Alice Johnson' },
//       { id: 'user2', name: 'Bob Smith' },
//     ],
//     createdAt: '2024-01-01',
//     tags: ['React', 'Web Development'],
//     rules: ['Be respectful to others', 'No spamming']
//   }
//   ,
//   {
//     id: 2,
//     name: 'JavaScript Masters',
//     description: 'Discuss all things JavaScript, from ES6 to modern frameworks.',
//     membersCount: 2000,
//   },
//   {
//     id: 3,
//     name: 'Frontend Wizards',
//     description: 'A community for frontend developers to share tips and tricks.',
//     membersCount: 1200,
//   },
//   {
//     id: 4,
//     name: 'Backend Gurus',
//     description: 'Dive deep into server-side development and databases.',
//     membersCount: 800,
//   },
//   {
//     id: 5,
//     name: 'Fullstack Heroes',
//     description: 'For developers who handle both frontend and backend tasks.',
//     membersCount: 950,
//   },
//   {
//     id: 6,
//     name: 'UI/UX Designers',
//     description: 'Discuss design principles, tools, and user experience strategies.',
//     membersCount: 1100,
//   },
//   {
//     id: 7,
//     name: 'DevOps Engineers',
//     description: 'Share knowledge on CI/CD, cloud infrastructure, and automation.',
//     membersCount: 700,
//   },
//   {
//     id: 8,
//     name: 'Mobile App Developers',
//     description: 'Focus on iOS and Android development best practices.',
//     membersCount: 600,
//   },
//   {
//     id: 9,
//     name: 'Data Scientists',
//     description: 'Explore data analysis, machine learning, and AI topics.',
//     membersCount: 500,
//   },
//   {
//     id: 10,
//     name: 'Cybersecurity Experts',
//     description: 'Discuss the latest in security protocols and threat prevention.',
//     membersCount: 400,
//   },
// ];

function Group() {
  const [isNewOpen, setIsNewOpen] = useState<boolean>();
  const [groups, setGroups] = useState<any[]>();
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>();
  const { user } = useContext(UserContext);
  const { setPageAlert } = useContext(AlertContext);
  const [groupsStateChange, setStateChange] = useState<boolean>(false);

  useEffect(() => {
    const getGroupsList = async () => {
      fetchAllGroups().then((response: any) => {
        if (response) {
          console.log(response);
          setGroups(response);
        }
      });
    };
    getGroupsList();
    setStateChange(false);
  }, [isNewOpen, isDetailOpen, groupsStateChange]);

  const handleOpenNew = () => setIsNewOpen(true);
  const handleCloseNew = () => setIsNewOpen(false);
  const handleOpenDetail = () => setIsDetailOpen(true);
  const handleCloseDetail = () => setIsDetailOpen(false);

  const navigate = useNavigate();

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

  const handleLeave = (event:any) => {
    console.log("leave called");
    const id = event.target.getAttribute("data-key");
    leaveGroup(id, user.id)
    .then((res:any) => {
      if(res == 200) {
        console.log("left");
        setStateChange(true);
        navigate(`/group`);
      }
    })
  }


  return (
    <Container className="group-page py-4">
      <Row>
        <h1 className="mb-4 text-center">Groups</h1>
        <Container>
          <Button variant="primary" className="me-2 " onClick={handleOpenNew}>
            Start a Group
          </Button>
        </Container>
      </Row>
      <Row className="pt-3">
        {groups && groups.length > 0 ? (
          groups.map((group) => (
            <Col
              key={group._id}
              data-key={group._id}
              md={6}
              lg={4}
              className="mb-4"
            >
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{group.name}</Card.Title>
                  <Card.Text>{group.description}</Card.Text>
                  <Card.Text>
                    <small className="text-muted">
                      {group.members.length} members
                    </small>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    href={`/group/${group._id}`}
                    className="me-2"
                  >
                    View Group
                  </Button>
                  {group.members.includes(user.id) ? (
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
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Container>
            <h4 className="mb4 text-center">No Groups Found</h4>
            <Button
              variant="primary"
              className="me-2 position-absolute translate-middle top-50 start-50"
              onClick={handleOpenNew}
            >
              Start a Group
            </Button>
          </Container>
        )}
      </Row>
      {isNewOpen && <NewGroup isOpen={isNewOpen} onClose={handleCloseNew} />}
    </Container>
  );
}

interface NewGroupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewGroup: React.FC<NewGroupProps> = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const { user } = useContext(UserContext);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await newGroup(groupName, groupDescription, user.id).then(
      (response: any) => {
        console.log(response);
        if (response.ok) {
          onClose();
        }
      }
    );
  };
  if (!isOpen) return null;
  return (
    <Modal show={isOpen} onHide={() => onClose()}>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Social Links</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type="text"
              name="groupName"
              value={groupName}
              placeholder="Group Name"
              className="mb-2"
              onChange={(event) => setGroupName(event.target.value)}
            />
            <Form.Label>Group Description</Form.Label>
            <Form.Control
              type="textarea"
              name="groupDescription"
              value={groupDescription}
              placeholder="Group Description"
              className="mb-2"
              onChange={(event) => setGroupDescription(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Group;

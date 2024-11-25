import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './GroupPage.css';


const groups = [
  {
    id: 1,
    name: 'React Developers',
    description: 'A group for React enthusiasts to share knowledge and resources.',
    membersCount: 1500,
    administrator: { id: 'admin123', name: 'John Doe' },
    members: [
      { id: 'user1', name: 'Alice Johnson' },
      { id: 'user2', name: 'Bob Smith' },
    ],
  },
  // Add more groups as needed...
];

const GroupPage = () => {
  const { groupId } = useParams(); // Get groupId from URL
  const group = groups.find((g) => g.id === parseInt(groupId || '', 10));

  if (!group) {
    return <Container className="mt-4"><h3>Group not found</h3></Container>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center display-4">{group.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">{group.description}</Card.Subtitle>
              <hr />
              <Card.Text>
                <strong>Administrator:</strong> {group.administrator.name}
              </Card.Text>
              <Card.Text>
                <strong>Members Count:</strong> {group.membersCount}
              </Card.Text>
              <h5 className="mt-4">Members</h5>
              <ul>
                {group.members.map((member) => (
                  <li key={member.id}>{member.name}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GroupPage;

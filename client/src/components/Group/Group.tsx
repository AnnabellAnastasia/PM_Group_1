import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Group.css';

const groups = [
  {
    id: 1,
    name: 'React Developers',
    description: 'A group for React enthusiasts to share knowledge and resources.',
    membersCount: 1500,
    administrator: {
      id: 'admin123',
      name: 'John Doe'
    },
    members: [
      { id: 'user1', name: 'Alice Johnson' },
      { id: 'user2', name: 'Bob Smith' },
    ],
    createdAt: '2024-01-01',
    tags: ['React', 'Web Development'],
    rules: ['Be respectful to others', 'No spamming']
  }
  ,
  {
    id: 2,
    name: 'JavaScript Masters',
    description: 'Discuss all things JavaScript, from ES6 to modern frameworks.',
    membersCount: 2000,
  },
  {
    id: 3,
    name: 'Frontend Wizards',
    description: 'A community for frontend developers to share tips and tricks.',
    membersCount: 1200,
  },
  {
    id: 4,
    name: 'Backend Gurus',
    description: 'Dive deep into server-side development and databases.',
    membersCount: 800,
  },
  {
    id: 5,
    name: 'Fullstack Heroes',
    description: 'For developers who handle both frontend and backend tasks.',
    membersCount: 950,
  },
  {
    id: 6,
    name: 'UI/UX Designers',
    description: 'Discuss design principles, tools, and user experience strategies.',
    membersCount: 1100,
  },
  {
    id: 7,
    name: 'DevOps Engineers',
    description: 'Share knowledge on CI/CD, cloud infrastructure, and automation.',
    membersCount: 700,
  },
  {
    id: 8,
    name: 'Mobile App Developers',
    description: 'Focus on iOS and Android development best practices.',
    membersCount: 600,
  },
  {
    id: 9,
    name: 'Data Scientists',
    description: 'Explore data analysis, machine learning, and AI topics.',
    membersCount: 500,
  },
  {
    id: 10,
    name: 'Cybersecurity Experts',
    description: 'Discuss the latest in security protocols and threat prevention.',
    membersCount: 400,
  },
];

function Group() {
  return (
    <Container className="group-page py-4">
      <h1 className="mb-4 text-center">Groups</h1>
      <Row>
        {groups.map((group) => (
          <Col key={group.id} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{group.name}</Card.Title>
                <Card.Text>{group.description}</Card.Text>
                <Card.Text>
                  <small className="text-muted">{group.membersCount} members</small>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
  <Button variant="primary" href={`/group/${group.id}`} className="me-2">
    View Group
  </Button>
  <Button variant="primary" href={`/group/${group.id}`}>
    Join Group
  </Button>
</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      
    </Container>
  );
}

export default Group;

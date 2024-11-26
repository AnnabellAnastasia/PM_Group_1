import React, { useContext, useEffect, useState, useRef } from "react";
import { handleLogOut, searchUser } from "../../utils/userAPI";
import { useNavigate } from "react-router-dom";
import { AlertContext, UserContext } from "../ContextWrapper";
import ChatModal from "../Chat/ChatRoom";
import {
  Container,
  Nav,
  Navbar,
  Alert,
  ListGroup,
  Form,
  NavDropdown,
  Image,
} from "react-bootstrap";
import "./Navbar.css";

const PageNavbar: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { pageAlert } = useContext(AlertContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("Nav user", user);
  }, [user]);

  async function handleSearchUsers(e: any, searchTerm: string) {
    setSearchTerm(searchTerm);
    setSearchResults(await searchUser(e, searchTerm));
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        data-bs-theme="dark"
        className="bg-gradient p-2"
      >
        {/* Left Section (Logo + Name) */}
        <Navbar.Brand href="/posts">
          <img
            alt="Niner Networking logo"
            src="/logo.png"
            width="30"
            height="30"
            className="logo d-inline-block align-top"
          />{" "}
          Niner Network
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          {/* Center Section (Search Section) */}
          <Container fluid className="position-relative">
            <Form.Control
              data-bs-theme="light"
              className="my-2"
              style={{ width: "100%" }}
              id="search"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => handleSearchUsers(e, e.target.value)}
            />

            {searchResults && searchResults[0] ? (
              <ListGroup
                data-bs-theme="light"
                className="position-absolute top-100 start-0 translate-left px-3"
                style={{ width: "100%" }}
              >
                <ListGroup.Item disabled style={{ width: "100%", margin: 0 }}>
                  Users
                </ListGroup.Item>
                {searchResults.map((result: any) => (
                  <ListGroup.Item
                    action
                    variant="light"
                    key={result.id}
                    style={{ width: "100%", margin: 0 }}
                    href={`/account/${result.id}`}
                  >
                    <Image
                      src={`http://localhost:8080/images/${
                        result.image
                          ? result.image
                          : "blank-profile-picture.png"
                      }`}
                      roundedCircle
                      className="search-profile-icon me-3"
                    />
                    {result.firstName}&nbsp;{result.lastName}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <></>
            )}
          </Container>

          {/* Right Section (Links + Profile Icon) */}
          <Nav className="mr-auto px-2">
            <Nav.Link className="mt-2" href="/about">
              About
            </Nav.Link>
            <Nav.Link className="mt-2" href="/services">
              Services
            </Nav.Link>
            <Nav.Link className="mt-2" href="/social">
              Social
            </Nav.Link>
            <Nav.Link className="mt-2" href="/contact">
              Contact
            </Nav.Link>
            <Nav.Link className="mt-2" href="/group">
              Group
            </Nav.Link>
            <Nav.Link className="chat-link ms-1" ref={ref} onClick={toggleChat}>
              {isChatOpen ? (
                <i className="fa-solid fa-envelope-open-text"></i>
              ) : (
                <i className="fa-solid fa-envelope"></i>
              )}
            </Nav.Link>
            <NavDropdown
              data-bs-theme="light"
              className="px-2"
              align={{ xs: "start" }}
              title={
                <Image
                  src={`http://localhost:8080/images/${
                    user.image ? user.image : "blank-profile-picture.png"
                  }`}
                  roundedCircle
                  className="profile-icon"
                />
              }
            >
              {user.id ? (
                <>
                  <NavDropdown.Item className="px-2" disabled>
                    {user.firstName}&nbsp;{user.lastName}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="px-2"
                    href={`/account/${user.id}`}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="px-2"
                    onClick={(event) => handleLogOut(event, navigate, setUser)}
                  >
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <Nav.Link className="px-2" href="/login">
                  Login
                </Nav.Link>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {/* ----- CHAT MODAL ----- */}
        <ChatModal
          isOpen={isChatOpen}
          onClose={toggleChat}
          triggerRef={ref}
        ></ChatModal>
      </Navbar>
      {pageAlert.error ? (
        <Alert className="errorAlert" variant="danger" dismissible>
          {pageAlert.error}
        </Alert>
      ) : (
        <></>
      )}
      {pageAlert.success ? (
        <Alert className="successAlert" variant="success" dismissible>
          {pageAlert.success}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};

export default PageNavbar;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProfileFromID } from "../../utils/userAPI";
import { capitalize } from "../../utils/tools";
// Edit Modals
import BasicInfoModal from "./BasicInfoModal";
import BiographyModal from "./BiographyModal";
import SocialInfoModal from "./SocialInfoModal";
import EducationInfoModal from "./EducationInfoModal";
import ContactInfoModal from "./ContactInfoModal";
import ProfilePictureModal from "./ProfilePictureModal";

import "./Account.css";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Card,
  Image,
  ButtonGroup,
  ListGroup,
} from "react-bootstrap";

import { updateUser, fetchAuth } from "../../utils/userAPI";

type ProfileField =
  | "firstName"
  | "lastName"
  | "title"
  | "titleVisibility"
  | "biography"
  | "biographyVisibility"
  | "major"
  | "majorVisibility"
  | "minor"
  | "minorVisibility"
  | "concentration"
  | "concentrationVisibility"
  | "location"
  | "locationVisibility"
  | "image"
  | "email"
  | "emailVisibility"
  | "website"
  | "websiteVisibility"
  | "github"
  | "githubVisibility"
  | "twitter"
  | "twitterVisibility"
  | "instagram"
  | "instagramVisibility"
  | "facebook"
  | "facebookVisibility"
  | "secondaryEmail"
  | "secondaryEmailVisibility"
  | "phone"
  | "phoneVisibility"
  | "address"
  | "addressVisibility";

interface Project {
  name: string;
  progress: number;
}

function Account() {
  const { userID } = useParams();
  const accountUserID = userID ?? "";

  const userStatuses = ["selfProfile", "friendProfile", "nonFriendProfile"];
  const visibilityOptions = ["public", "friends", "hidden"];

  const [userStatus, setUserStatus] = useState(userStatuses[2]);
  const blankFields = {
    firstName: "",
    lastName: "",
    title: "",
    titleVisibility: "",
    biography: "",
    biographyVisibility: "",
    major: "",
    majorVisibility: "",
    minor: "",
    minorVisibility: "",
    concentration: "",
    concentrationVisibility: "",
    location: "",
    locationVisibility: "",
    image: "",
    email: "",
    emailVisibility: "",
    website: "",
    websiteVisibility: "",
    github: "",
    githubVisibility: "",
    twitter: "",
    twitterVisibility: "",
    instagram: "",
    instagramVisibility: "",
    facebook: "",
    facebookVisibility: "",
    secondaryEmail: "",
    secondaryEmailVisibility: "",
    phone: "",
    phoneVisibility: "",
    address: "",
    addressVisibility: "",
  };
  const [formData, setFormData] = useState(blankFields);

  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingBiography, setIsEditingBiography] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingProjects, setIsEditingProjects] = useState(false);

  // const [projects, setProjects] = useState<Project[]>([
  //   { name: "Web Design", progress: 80 },
  //   { name: "Website Markup", progress: 72 },
  //   { name: "One Page", progress: 89 },
  //   { name: "Mobile Template", progress: 55 },
  //   { name: "Backend API", progress: 66 },
  // ]);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);
  useEffect(() => {
    console.log("USER STATUS", userStatus);
  }, [userStatus]);

  const getAccountUserInfo = async () => {
    let user = await fetchProfileFromID(accountUserID);
    if (!user) {
      user = blankFields;
    }
    console.log("Set Account User", user);
    setFormData(user);
  };

  const checkUserStatus = async () => {
    const { user } = (await fetchAuth()) || {};
    if (user) {
      console.log("USER LOGGED IN");
      if (user === accountUserID) {
        console.log("PROFILE BELONGS TO LOGGED IN USER");
        setUserStatus(userStatuses[0]);
      } else {
        console.log("DIFFERENT USER PROFILE");
        setUserStatus(userStatuses[2]);
      }
    } else {
      console.log("USER NOT LOGGED IN");
      setUserStatus(userStatuses[2]);
    }
  };

  useEffect(() => {
    checkUserStatus();
    getAccountUserInfo();
  }, [accountUserID]);

  function openModal(stateFunction: Function) {
    stateFunction(true);
  }

  async function closeModal(stateFunction: Function) {
    await getAccountUserInfo();
    stateFunction(false);
  }

  async function saveAndCloseModal(stateFunction: Function) {
    await updateUser(accountUserID, formData);
    await getAccountUserInfo();
    stateFunction(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderVisibilityButtons = (field: ProfileField) => {
    return (
      <Form.Group as={Row} className="mb-2">
        <Col xs="auto">
          <Form.Check
            id={field + "-" + visibilityOptions[0]}
            type="radio"
            name={field}
            value={visibilityOptions[0]}
            checked={formData[field] === visibilityOptions[0]}
            onChange={handleInputChange}
            label={capitalize(visibilityOptions[0])}
          />
        </Col>
        <Col xs="auto" className="me-auto">
          <Form.Check
            type="radio"
            name={field}
            value={visibilityOptions[1]}
            checked={formData[field] === visibilityOptions[1]}
            onChange={handleInputChange}
            label={capitalize(visibilityOptions[1])}
          />
        </Col>
        <Col className="me-auto">
          <Form.Check
            type="radio"
            name={field}
            value={visibilityOptions[2]}
            checked={formData[field] === visibilityOptions[2]}
            onChange={handleInputChange}
            label={capitalize(visibilityOptions[2])}
          />
        </Col>
      </Form.Group>
    );
  };

  const checkDisplayField = (visibility: string, element: string) => {
    if (userStatus === userStatuses[0]) return true;
    if (!element) return false;
    if (visibility === visibilityOptions[0]) return true;
    if (visibility === visibilityOptions[1] && userStatus === userStatuses[1])
      return true;
    return false;
  };

  // const handleEditProjectsClick = () =>
  //   setIsEditingProjects(!isEditingProjects);

  // const handleProjectChange = (
  //   index: number,
  //   field: "name" | "progress",
  //   value: string | number
  // ) => {
  //   setProjects((prevProjects) => {
  //     const updatedProjects = [...prevProjects];
  //     updatedProjects[index] = {
  //       ...updatedProjects[index],
  //       [field]: value,
  //     };
  //     return updatedProjects;
  //   });
  // };

  // // Function to add a new skill/project
  // const handleAddSkill = () => {
  //   setProjects((prevProjects) => [
  //     ...prevProjects,
  //     { name: "New Skill", progress: 0 },
  //   ]);
  // };

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          {/* Basic Info Sidebar */}
          <Card className="text-center mb-4">
            <Card.Body>
              <div className="image-wrapper">
                <Image
                  src={`http://localhost:8080/images/${
                    formData.image
                      ? formData.image
                      : "blank-profile-picture.png"
                  }`}
                  roundedCircle
                  thumbnail
                  className="UPP m-3"
                  alt="User Profile"
                />

                {userStatus === userStatuses[0] && (
                  <div className="overlay-button">
                    <Button
                      variant="light"
                      onClick={() => openModal(setIsEditingPhoto)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </div>
                )}
              </div>

              <h3>
                {`${formData.firstName} ${formData.lastName} `}
                {userStatus === userStatuses[0] && (
                  <Button
                    variant="light"
                    onClick={() => openModal(setIsEditingBasic)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                )}
              </h3>
              {checkDisplayField(formData.titleVisibility, formData.title) && (
                <div className="text-muted mb-2">
                  {formData.title && `${formData.title || ""}`}
                </div>
              )}
              {checkDisplayField(
                formData.locationVisibility,
                formData.location
              ) && (
                <div className="text-muted mb-2">
                  {formData.location && `${formData.location || ""}`}
                </div>
              )}

              <ButtonGroup>
                {userStatus === userStatuses[2] && (
                  <Button variant="primary">+ Add as Friend</Button>
                )}
                {userStatus !== userStatuses[0] && (
                  <Button variant="outline-primary">Message</Button>
                )}
              </ButtonGroup>
            </Card.Body>
          </Card>

          {/* Social Links */}
          {(checkDisplayField(formData.websiteVisibility, formData.website) ||
            checkDisplayField(formData.githubVisibility, formData.github) ||
            checkDisplayField(formData.twitterVisibility, formData.twitter) ||
            checkDisplayField(
              formData.instagramVisibility,
              formData.instagram
            ) ||
            checkDisplayField(
              formData.facebookVisibility,
              formData.facebook
            )) && (
            <Card>
              <Card.Header>
                <h5 className="card-heading">
                  Social Links{" "}
                  {userStatus === userStatuses[0] && (
                    <Button
                      variant="light"
                      onClick={() => openModal(setIsEditingSocial)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  )}
                </h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {checkDisplayField(
                    formData.websiteVisibility,
                    formData.website
                  ) && (
                    <ListGroup.Item>
                      <i className="fa-solid fa-arrow-pointer"></i>
                      {" - "}
                      <a href={`${formData.website || "#"}`}>
                        {" "}
                        {`${formData.website || ""}`}
                      </a>
                    </ListGroup.Item>
                  )}
                  {checkDisplayField(
                    formData.githubVisibility,
                    formData.github
                  ) && (
                    <ListGroup.Item>
                      <i className="fa-brands fa-github"></i>
                      {" - "}
                      <a href={`http://github.com/${formData.github || "#"}`}>
                        {" "}
                        {`github.com/${formData.github || ""}`}
                      </a>
                    </ListGroup.Item>
                  )}
                  {checkDisplayField(
                    formData.twitterVisibility,
                    formData.twitter
                  ) && (
                    <ListGroup.Item>
                      <i className="fa-brands fa-x-twitter"></i>
                      {" - "}
                      <a href={`http://twitter.com/${formData.twitter || "#"}`}>
                        {" @"}
                        {`${formData.twitter || ""}`}
                      </a>
                    </ListGroup.Item>
                  )}
                  {checkDisplayField(
                    formData.instagramVisibility,
                    formData.instagram
                  ) && (
                    <ListGroup.Item>
                      <i className="fa-brands fa-instagram"></i>
                      {" - "}
                      <a
                        href={`http://instagram.com/${
                          formData.instagram || "#"
                        }`}
                      >
                        {" "}
                        {`instagram.com/${formData.instagram || ""}`}
                      </a>
                    </ListGroup.Item>
                  )}
                  {checkDisplayField(
                    formData.facebookVisibility,
                    formData.facebook
                  ) && (
                    <ListGroup.Item>
                      <i className="fa-brands fa-facebook"></i>
                      {" - "}
                      <a
                        href={`http://facebook.com/${formData.facebook || "#"}`}
                      >
                        {" "}
                        {`facebook.com/${formData.facebook || ""}`}
                      </a>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={8}>
          {/* Profile Biography */}
          {checkDisplayField(
            formData.biographyVisibility,
            formData.biography
          ) && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="card-heading">
                  Biography{" "}
                  {userStatus === userStatuses[0] && (
                    <Button
                      variant="light"
                      onClick={() => openModal(setIsEditingBiography)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  )}
                </h5>
              </Card.Header>
              <Card.Body className="mb-2">
                {formData.biography}
              </Card.Body>
            </Card>
          )}


<Card className="mb-4">
<Card.Header>
                <h5 className="card-heading">
                  Friends{" "}
                  {userStatus === userStatuses[0] && (
                    <Button
                      variant="light"
                      onClick={() => openModal(setIsEditingEducation)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  )}
                </h5>
              </Card.Header>
  <Card.Body>
  <p>42 connections</p> 
  <ListGroup variant="flush">
    <ListGroup.Item>Alice Johnson</ListGroup.Item>
    <ListGroup.Item>Bob Smith</ListGroup.Item>
    <ListGroup.Item>Charlie Brown</ListGroup.Item>
    <ListGroup.Item>+ 38 more</ListGroup.Item>
  </ListGroup>
</Card.Body>
</Card>



          {/* Education Information */}
          {(checkDisplayField(formData.majorVisibility, formData.major) ||
            checkDisplayField(formData.minorVisibility, formData.minor) ||
            checkDisplayField(
              formData.concentrationVisibility,
              formData.concentration
            )) && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="card-heading">
                  Education Information{" "}
                  {userStatus === userStatuses[0] && (
                    <Button
                      variant="light"
                      onClick={() => openModal(setIsEditingEducation)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  )}
                </h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush" className="mb-2">
                  {checkDisplayField(
                    formData.majorVisibility,
                    formData.major
                  ) && <ListGroup.Item>Major: {formData.major}</ListGroup.Item>}
                  {checkDisplayField(
                    formData.minorVisibility,
                    formData.minor
                  ) && <ListGroup.Item>Minor: {formData.minor}</ListGroup.Item>}
                  {checkDisplayField(
                    formData.concentrationVisibility,
                    formData.concentration
                  ) && (
                    <ListGroup.Item>
                      Concentration: {formData.concentration}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          )}

          {/* Contact Information */}
          {(checkDisplayField(formData.emailVisibility, formData.email) ||
            checkDisplayField(
              formData.secondaryEmailVisibility,
              formData.secondaryEmail
            ) ||
            checkDisplayField(formData.phoneVisibility, formData.phone) ||
            checkDisplayField(
              formData.addressVisibility,
              formData.address
            )) && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="card-heading">
                  Contact Information{" "}
                  {userStatus === userStatuses[0] && (
                    <Button
                      variant="light"
                      onClick={() => openModal(setIsEditingContact)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  )}
                </h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush" className="mb-2">
                  {checkDisplayField(
                    formData.emailVisibility,
                    formData.email
                  ) && (
                    <ListGroup.Item>
                      UNC Charlotte Email: {formData.email}
                    </ListGroup.Item>
                  )}
                  {checkDisplayField(
                    formData.secondaryEmailVisibility,
                    formData.secondaryEmail
                  ) && (
                    <ListGroup.Item>
                      Secondary Email: {formData.secondaryEmail}
                    </ListGroup.Item>
                  )}
                  {checkDisplayField(
                    formData.phoneVisibility,
                    formData.phone
                  ) && <ListGroup.Item>Phone: {formData.phone}</ListGroup.Item>}
                  {checkDisplayField(
                    formData.addressVisibility,
                    formData.address
                  ) && (
                    <ListGroup.Item>Address: {formData.address}</ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          )}

          {/* Friends */}
          {/* <div className="card mb-4">
            <div className="card-header">
              <h5>Skills</h5>
            </div>
            <div className="card-body">
              {projects.map((project, index) => (
                <div key={index} className="mb-3">
                  {isEditingProjects ? (
                    <>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          handleProjectChange(index, "name", e.target.value)
                        }
                        className="form-control mb-2"
                      />
                      <input
                        type="number"
                        value={project.progress}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "progress",
                            Number(e.target.value)
                          )
                        }
                        className="form-control mb-2"
                        max="100"
                        min="0"
                      />
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>{project.name}</strong>
                      </p>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${project.progress}%` }}
                          aria-valuenow={project.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          {project.progress}%
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

              <div className="button-container mt-3">
                {isEditingProjects && (
                  <button
                    onClick={handleAddSkill}
                    className="btn btn-primary me-2"
                  >
                    + Add Skill
                  </button>
                )}
                <button
                  onClick={handleEditProjectsClick}
                  className="btn btn-info"
                >
                  {isEditingProjects ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div> */}
        </Col>
      </Row>
      {/* Modals for Editing */}
      {userStatus === userStatuses[0] && (
        <>
          <ProfilePictureModal
            isEditingPhoto={isEditingPhoto}
            setIsEditingPhoto={setIsEditingPhoto}
            closeModal={closeModal}
            accountUserID={accountUserID}
          />
          <BasicInfoModal
            isEditingBasic={isEditingBasic}
            setIsEditingBasic={setIsEditingBasic}
            closeModal={closeModal}
            saveAndCloseModal={saveAndCloseModal}
            renderVisibilityButtons={renderVisibilityButtons}
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <BiographyModal
            isEditingBiography={isEditingBiography}
            setIsEditingBiography={setIsEditingBiography}
            closeModal={closeModal}
            saveAndCloseModal={saveAndCloseModal}
            renderVisibilityButtons={renderVisibilityButtons}
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <SocialInfoModal
            isEditingSocial={isEditingSocial}
            setIsEditingSocial={setIsEditingSocial}
            closeModal={closeModal}
            saveAndCloseModal={saveAndCloseModal}
            renderVisibilityButtons={renderVisibilityButtons}
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <EducationInfoModal
            isEditingEducation={isEditingEducation}
            setIsEditingEducation={setIsEditingEducation}
            closeModal={closeModal}
            saveAndCloseModal={saveAndCloseModal}
            renderVisibilityButtons={renderVisibilityButtons}
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <ContactInfoModal
            isEditingContact={isEditingContact}
            setIsEditingContact={setIsEditingContact}
            closeModal={closeModal}
            saveAndCloseModal={saveAndCloseModal}
            renderVisibilityButtons={renderVisibilityButtons}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </>
      )}
    </Container>
  );
}

export default Account;

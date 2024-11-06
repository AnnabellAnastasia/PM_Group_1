import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProfileFromID } from "../../utils/userAPI";
import { capitalize } from "../../utils/tools";
// Edit Modals
import BasicInfoModal from "./BasicInfoModal";
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
  | "description"
  | "descriptionVisibility"
  | "major"
  | "majorVisibility"
  | "minor"
  | "minorVisibility"
  | "concentration"
  | "concentrationVisibility"
  | "location"
  | "locationVisibility"
  | "image"
  | "unccEmail"
  | "unccEmailVisibility"
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    description: "",
    descriptionVisibility: "",
    major: "",
    majorVisibility: "",
    minor: "",
    minorVisibility: "",
    concentration: "",
    concentrationVisibility: "",
    location: "",
    locationVisibility: "",
    image: "",
    unccEmail: "",
    unccEmailVisibility: "",
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
  });

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const getAccountUserInfo = async () => {
    let user = await fetchProfileFromID(accountUserID);
    if (!user) {
      user = {
        firstName: "",
        lastName: "",
        description: "",
        descriptionVisibility: "",
        major: "",
        majorVisibility: "",
        minor: "",
        minorVisibility: "",
        concentration: "",
        concentrationVisibility: "",
        location: "",
        locationVisibility: "",
        image: "",
        unccEmail: "",
        unccEmailVisibility: "",
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
    }
    console.log("Set Account User", user);
    setFormData(user);
  };

  const userStatuses = ["selfProfile", "friendProfile", "nonFriendProfile"];

  const [userStatus, setUserStatus] = useState(userStatuses[2]);

  useEffect(() => {
    console.log("USER STATUS", userStatus);
  }, [userStatus]);

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

  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingProjects, setIsEditingProjects] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    { name: "Web Design", progress: 80 },
    { name: "Website Markup", progress: 72 },
    { name: "One Page", progress: 89 },
    { name: "Mobile Template", progress: 55 },
    { name: "Backend API", progress: 66 },
  ]);

  const handleEditBasicOpen = () => setIsEditingBasic(true);
  const handleEditBasicClose = async () => {
    await getAccountUserInfo();
    setIsEditingBasic(false);
  };
  const handleEditBasicSave = async () => {
    await updateUser(accountUserID, formData);
    await getAccountUserInfo();
    setIsEditingBasic(false);
  };
  const handleEditContactOpen = () => setIsEditingContact(true);
  const handleEditContactClose = async () => {
    await getAccountUserInfo();
    setIsEditingContact(false);
  };
  const handleEditContactSave = async () => {
    await updateUser(accountUserID, formData);
    await getAccountUserInfo();
    setIsEditingContact(false);
  };
  const handleEditEducationOpen = () => setIsEditingEducation(true);
  const handleEditEducationClose = async () => {
    await getAccountUserInfo();
    setIsEditingEducation(false);
  };
  const handleEditEducationSave = async () => {
    await updateUser(accountUserID, formData);
    await getAccountUserInfo();
    setIsEditingEducation(false);
  };
  const handleEditSocialOpen = () => setIsEditingSocial(true);
  const handleEditSocialClose = async () => {
    await getAccountUserInfo();
    setIsEditingSocial(false);
  };
  const handleEditSocialSave = async () => {
    await updateUser(accountUserID, formData);
    await getAccountUserInfo();
    setIsEditingSocial(false);
  };
  const handleEditPhotoOpen = () => setIsEditingPhoto(true);
  const handleEditPhotoClose = async () => {
    await getAccountUserInfo();
    setIsEditingPhoto(false);
  };
  const handleEditPhotoSave = async () => {
    await updateUser(accountUserID, formData);
    await getAccountUserInfo();
    setIsEditingPhoto(false);
  };

  const handleEditProjectsClick = () =>
    setIsEditingProjects(!isEditingProjects);

  const [showOverlay, setShowOverlay] = useState(false);

  const handleEmailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("@")) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
    handleInputChange(e);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProjectChange = (
    index: number,
    field: "name" | "progress",
    value: string | number
  ) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
      return updatedProjects;
    });
  };

  // Function to add a new skill/project
  const handleAddSkill = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { name: "New Skill", progress: 0 },
    ]);
  };

  const visibilityOptions = ["public", "friends", "hidden"];

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

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          {/* Basic Info Sidebar */}
          {userStatus === userStatuses[0] && (
            <ProfilePictureModal
              isEditingPhoto={isEditingPhoto}
              handleEditPhotoClose={handleEditPhotoClose}
              handleEditPhotoSave={handleEditPhotoSave}
              accountUserID={accountUserID}
            />
          )}
          {userStatus === userStatuses[0] && (
            <BasicInfoModal
              isEditingBasic={isEditingBasic}
              handleEditBasicClose={handleEditBasicClose}
              handleEditBasicSave={handleEditBasicSave}
              renderVisibilityButtons={renderVisibilityButtons}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
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
                    <Button variant="dark" onClick={handleEditPhotoOpen}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </div>
                )}
              </div>

              <h3>
                {`${formData.firstName} ${formData.lastName} `}
                {userStatus === userStatuses[0] && (
                  <Button
                    variant="dark"
                    onClick={handleEditBasicOpen}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                )}
              </h3>
              {checkDisplayField(
                formData.descriptionVisibility,
                formData.description
              ) && (
                <div className="text-muted mb-2">
                  {formData.description && `${formData.description || ""}`}
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
          {userStatus === userStatuses[0] && (
            <SocialInfoModal
              isEditingSocial={isEditingSocial}
              handleEditSocialClose={handleEditSocialClose}
              handleEditSocialSave={handleEditSocialSave}
              renderVisibilityButtons={renderVisibilityButtons}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {checkDisplayField(formData.websiteVisibility, formData.website) &&
            checkDisplayField(formData.githubVisibility, formData.github) &&
            checkDisplayField(formData.twitterVisibility, formData.twitter) &&
            checkDisplayField(
              formData.instagramVisibility,
              formData.instagram
            ) &&
            checkDisplayField(
              formData.facebookVisibility,
              formData.facebook
            ) && (
              <Card>
                <Card.Header>
                  <h5>
                    Social Links{" "}
                    {userStatus === userStatuses[0] && (
                      <Button
                        variant="dark"
                        onClick={handleEditSocialOpen}
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
                        <i className="bi bi-globe me-2"></i>Website:{" "}
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
                        <i className="bi bi-github me-2"></i>Github:{" "}
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
                        <i className="bi bi-twitter me-2"></i>Twitter:{" "}
                        <a
                          href={`http://twitter.com/${formData.twitter || "#"}`}
                        >
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
                        <i className="bi bi-instagram me-2"></i>Instagram:{" "}
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
                        <i className="bi bi-facebook me-2"></i>Facebook:{" "}
                        <a
                          href={`http://facebook.com/${
                            formData.facebook || "#"
                          }`}
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
          {/* Education Information */}
          {userStatus === userStatuses[0] && (
            <EducationInfoModal
              isEditingEducation={isEditingEducation}
              handleEditEducationClose={handleEditEducationClose}
              handleEditEducationSave={handleEditEducationSave}
              renderVisibilityButtons={renderVisibilityButtons}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {checkDisplayField(formData.majorVisibility, formData.major) &&
            checkDisplayField(formData.minorVisibility, formData.minor) &&
            checkDisplayField(
              formData.concentrationVisibility,
              formData.concentration
            ) && (
              <Card className="mb-4">
                <Card.Header>
                  <h5>
                    Education Information{" "}
                    {userStatus === userStatuses[0] && (
                      <Button
                        variant="dark"
                        onClick={handleEditEducationOpen}
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
                    ) && (
                      <ListGroup.Item>Major: {formData.major}</ListGroup.Item>
                    )}
                    {checkDisplayField(
                      formData.minorVisibility,
                      formData.minor
                    ) && (
                      <ListGroup.Item>Minor: {formData.minor}</ListGroup.Item>
                    )}
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
          {userStatus === userStatuses[0] && (
            <ContactInfoModal
              isEditingContact={isEditingContact}
              handleEditContactClick={handleEditContactClose}
              handleEditContactSave={handleEditContactSave}
              renderVisibilityButtons={renderVisibilityButtons}
              formData={formData}
              handleInputChange={handleInputChange}
              handleEmailValidation={handleEmailValidation}
              showOverlay={showOverlay}
            />
          )}
          {checkDisplayField(
            formData.unccEmailVisibility,
            formData.unccEmail
          ) &&
            checkDisplayField(
              formData.secondaryEmailVisibility,
              formData.secondaryEmail
            ) &&
            checkDisplayField(formData.phoneVisibility, formData.phone) &&
            checkDisplayField(formData.addressVisibility, formData.address) && (
              <Card className="mb-4">
                <Card.Header>
                  <h5>
                    Contact Information{" "}
                    {userStatus === userStatuses[0] && (
                      <Button
                        variant="dark"
                        onClick={handleEditContactOpen}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                    )}
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush" className="mb-2">
                    {checkDisplayField(
                      formData.unccEmailVisibility,
                      formData.unccEmail
                    ) && (
                      <ListGroup.Item>
                        UNC Charlotte Email: {formData.unccEmail}
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
                    ) && (
                      <ListGroup.Item>Phone: {formData.phone}</ListGroup.Item>
                    )}
                    {checkDisplayField(
                      formData.addressVisibility,
                      formData.address
                    ) && (
                      <ListGroup.Item>
                        Address: {formData.address}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

          {/* Editable Skills */}
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
                    className="btn btn-success me-2"
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
    </Container>
  );
}

export default Account;

import { useState } from "react";
import { Button, Modal, Card, Form, InputGroup } from "react-bootstrap";

export default function SocialInfoModal({
  isEditingSocial,
  setIsEditingSocial,
  closeModal,
  saveAndCloseModal,
  renderVisibilityButtons,
  formData,
  handleInputChange,
}: any) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("Invalid Form");
    }

    setValidated(true);
    saveAndCloseModal(setIsEditingSocial);
  };
  return (
    <Modal show={isEditingSocial} onHide={() => closeModal(setIsEditingSocial)}>
      <Form validated={validated} onSubmit={(event) => handleSubmit(event)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Social Links</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData["website"]}
              placeholder="Website"
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("websiteVisibility")}
          <Form.Group>
            <Form.Label>Github</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>github.com/</InputGroup.Text>
              <Form.Control
                type="text"
                name="github"
                value={formData["github"]}
                placeholder="Github"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>
          {renderVisibilityButtons("githubVisibility")}
          <Form.Group>
            <Form.Label>Twitter</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                type="text"
                name="twitter"
                value={formData["twitter"]}
                placeholder="Twitter"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>
          {renderVisibilityButtons("twitterVisibility")}
          <Form.Group>
            <Form.Label>Instagram</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>instagram.com/</InputGroup.Text>
              <Form.Control
                type="text"
                name="instagram"
                value={formData["instagram"]}
                placeholder="Instagram"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>
          {renderVisibilityButtons("instagramVisibility")}
          <Form.Group>
            <Form.Label>Facebook</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>facebook.com/</InputGroup.Text>
              <Form.Control
                type="text"
                name="facebook"
                value={formData["facebook"]}
                placeholder="Facebook"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>
          {renderVisibilityButtons("facebookVisibility")}
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeModal(setIsEditingSocial)}>
          Close
        </Button>
        <Button variant="primary" 
        type="submit">
          Save Changes
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}

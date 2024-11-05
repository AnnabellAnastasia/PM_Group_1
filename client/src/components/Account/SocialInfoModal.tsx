import { useState } from "react";
import { Button, Modal, Card, Form, InputGroup } from "react-bootstrap";

export default function SocialInfoModal({
  isEditingSocial,
  handleEditSocialClose,
  handleEditSocialSave,
  renderVisibilityButtons,
  formData,
  handleInputChange,
}: any) {
  return (
    <Modal show={isEditingSocial} onHide={handleEditSocialClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Social Links</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="website"
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
                type="github"
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
                type="twitter"
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
                type="instagram"
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
                type="facebook"
                name="facebook"
                value={formData["facebook"]}
                placeholder="Facebook"
                onChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>
          {renderVisibilityButtons("facebookVisibility")}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditSocialClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditSocialSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

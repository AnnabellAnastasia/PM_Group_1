import { useState } from "react";
import { Button, Modal, Card, Form, InputGroup } from "react-bootstrap";

export default function BasicInfoModal({
  isEditingBasic,
  handleEditBasicClose,
  handleEditBasicSave,
  renderVisibilityButtons,
  formData,
  handleInputChange,
}: any) {
  return (
    <Modal show={isEditingBasic} onHide={handleEditBasicClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Basic Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Text>* Indicates a Required Field</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name *</Form.Label>
            <InputGroup>
              <Form.Control
                type="firstName"
                name="firstName"
                value={formData["firstName"]}
                placeholder="First Name"
                onChange={handleInputChange}
                className="mb-2"
              />
              <Form.Control
                type="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData["lastName"]}
                onChange={handleInputChange}
                className="mb-2"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              name="description"
              value={formData["description"]}
              placeholder="Description"
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("descriptionVisibility")}
          <Form.Group>
            <Form.Label>Location / Hometown</Form.Label>
            <Form.Control
              type="location"
              name="location"
              value={formData["location"]}
              placeholder="Location / Hometown"
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("locationVisibility")}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditBasicClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditBasicSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

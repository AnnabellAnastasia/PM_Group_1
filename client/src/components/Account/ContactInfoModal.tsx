import { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

export default function ContactInfoModal({
  isEditingContact,
  handleEditContactClose,
  handleEditContactSave,
  renderVisibilityButtons,
  formData,
  handleInputChange,
  handleEmailValidation,
  showOverlay
}: any) {
  return (
    <Modal show={isEditingContact} onHide={handleEditContactClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Text>* Indicates a Required Field</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>UNC Charlotte Email *</Form.Label>
            <InputGroup className="mb-2">
              <Form.Control
                type="unccEmail"
                name="unccEmail"
                value={formData["unccEmail"]}
                onChange={handleEmailValidation}
              />
              <InputGroup.Text>@charlotte.edu</InputGroup.Text>
            </InputGroup>
            {showOverlay && (
              <Form.Text>
                A UNC Charlotte Email Address is required. Please enter only
                your UNC Charlotte Email prefix.
              </Form.Text>
            )}
          </Form.Group>
          {renderVisibilityButtons("unccEmailVisibility")}
          <Form.Group>
            <Form.Label>Secondary Email</Form.Label>
            <Form.Control
              type="secondaryEmail"
              name="secondaryEmail"
              value={formData["secondaryEmail"]}
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("secondaryEmailVisibility")}
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="phone"
              name="phone"
              value={formData["phone"]}
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("phoneVisibility")}
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="address"
              name="address"
              value={formData["address"]}
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("addressVisibility")}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditContactClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditContactSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

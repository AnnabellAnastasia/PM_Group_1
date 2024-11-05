import { useState } from "react";
import { Button, Modal, Card, Form, InputGroup } from "react-bootstrap";

export default function EducationInfoModal({
  isEditingEducation,
  handleEditEducationClose,
  handleEditEducationSave,
  renderVisibilityButtons,
  formData,
  handleInputChange,
}: any) {
  return (
    <Modal show={isEditingEducation} onHide={handleEditEducationClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Education Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Major</Form.Label>
            <Form.Control
              type="major"
              name="major"
              value={formData["major"]}
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("majorVisibility")}
          <Form.Group>
            <Form.Label>Minor</Form.Label>
            <Form.Control
              type="minor"
              name="minor"
              value={formData["minor"]}
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("minorVisibility")}
          <Form.Group>
            <Form.Label>Concentration</Form.Label>
            <Form.Control
              type="concentration"
              name="concentration"
              value={formData["concentration"]}
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("concentrationVisibility")}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditEducationClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditEducationSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

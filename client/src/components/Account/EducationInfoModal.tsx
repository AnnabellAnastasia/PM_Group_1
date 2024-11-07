import { useState } from "react";
import { Button, Modal, Card, Form, InputGroup } from "react-bootstrap";

export default function EducationInfoModal({
  isEditingEducation,
  setIsEditingEducation,
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
    saveAndCloseModal(setIsEditingEducation);
  };
  return (
    <Modal
      show={isEditingEducation}
      onHide={() => closeModal(setIsEditingEducation)}
    >
      <Form validated={validated} onSubmit={(event) => handleSubmit(event)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Education Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Major</Form.Label>
            <Form.Control
              type="text"
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
              type="text"
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
              type="text"
              name="concentration"
              value={formData["concentration"]}
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("concentrationVisibility")}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => closeModal(setIsEditingEducation)}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

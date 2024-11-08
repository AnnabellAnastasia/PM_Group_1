import { useState } from "react";
import { Button, Modal, Card, Form, InputGroup } from "react-bootstrap";

export default function BasicInfoModal({
  isEditingBasic,
  setIsEditingBasic,
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
    saveAndCloseModal(setIsEditingBasic);
  };

  return (
    <Modal show={isEditingBasic} onHide={() => closeModal(setIsEditingBasic)}>
      <Form validated={validated} onSubmit={(event) => handleSubmit(event)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Basic Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Text>* Indicates a Required Field</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name *</Form.Label>
            <InputGroup>
              <Form.Control
                required
                type="text"
                name="firstName"
                value={formData["firstName"]}
                placeholder="First Name"
                onChange={handleInputChange}
                className="mb-2"
              />
              <Form.Control
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData["lastName"]}
                onChange={handleInputChange}
                className="mb-2"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData["title"]}
              placeholder="Title"
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("titleVisibility")}
          <Form.Group>
            <Form.Label>Location / Hometown</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData["location"]}
              placeholder="Location / Hometown"
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("locationVisibility")}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => closeModal(setIsEditingBasic)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

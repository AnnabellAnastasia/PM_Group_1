import { useState } from "react";
import { Button, Modal, Card, Form, InputGroup } from "react-bootstrap";

export default function BiographyModal({
  isEditingBiography,
  setIsEditingBiography,
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
    saveAndCloseModal(setIsEditingBiography);
  };

  return (
    <Modal show={isEditingBiography} onHide={() => closeModal(setIsEditingBiography)}>
      <Form validated={validated} onSubmit={(event) => handleSubmit(event)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Biography</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Biography</Form.Label>
            <Form.Control
              as="textarea"
              name="biography"
              value={formData["biography"]}
              placeholder="..."
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("biographyVisibility")}
          </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => closeModal(setIsEditingBiography)}
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

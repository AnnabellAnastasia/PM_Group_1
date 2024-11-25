import { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

export default function ContactInfoModal({
  isEditingContact,
  setIsEditingContact,
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
    saveAndCloseModal(setIsEditingContact);
  };
  return (
    <Modal
      show={isEditingContact}
      onHide={() => closeModal(setIsEditingContact)}
    >
      <Form validated={validated} onSubmit={(event) => handleSubmit(event)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact Information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Text>* Indicates a Required Field</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>UNC Charlotte Email *</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={formData["email"]}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid UNC Charlotte Email.
            </Form.Control.Feedback>
          </Form.Group>
          {renderVisibilityButtons("emailVisibility")}
          <Form.Group>
            <Form.Label>Secondary Email</Form.Label>
            <Form.Control
              type="email"
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
              type="number"
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
              type="text"
              name="address"
              value={formData["address"]}
              onChange={handleInputChange}
              className="mb-2"
            />
          </Form.Group>
          {renderVisibilityButtons("addressVisibility")}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => closeModal(setIsEditingContact)}
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

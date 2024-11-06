import { useState, useEffect, useContext } from "react";
import { Button, Modal, Card, Form, InputGroup } from "react-bootstrap";
import { uploadImage } from "../../utils/userAPI";
import { AlertContext } from "../ContextWrapper";

export default function BasicInfoModal({
  isEditingPhoto,
  handleEditPhotoClose,
  accountUserID,
}: any) {
  const { setPageAlert } = useContext(AlertContext);
  const [file, setFile] = useState<any>();

  useEffect(() => {
    console.log("file", file);
  }, [file]);

  function handleChooseFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  }

  async function handleUploadImage() {
    const imageData = new FormData()
    imageData.append("image", file);


    const returnValue = await uploadImage(accountUserID, imageData) || "";
    if (returnValue.error) setPageAlert({ error: returnValue.error, success: ""});
    console.log("returnValue", returnValue);
    handleEditPhotoClose();
  }

  return (
    <Modal show={isEditingPhoto} onHide={handleEditPhotoClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif"
							className="mb-2"
              onChange={(event) => handleChooseFile(event)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditPhotoClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUploadImage}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

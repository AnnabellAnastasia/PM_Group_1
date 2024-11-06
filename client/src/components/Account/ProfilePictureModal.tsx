import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, InputGroup } from "react-bootstrap";
import { uploadImage } from "../../utils/userAPI";

export default function BasicInfoModal({
  isEditingPhoto,
  handleEditPhotoClose,
  handleEditPhotoSave,
  accountUserID,
}: any) {
  const [file, setFile] = useState<any>();

  useEffect(() => {
    console.log("file", file);
  }, [file]);

  function handleChooseFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  }

  function handleUploadImage() {
    const imageData = new FormData()
    imageData.append("image", file);

    console.log("imageData", imageData);
    uploadImage(accountUserID, imageData);

    handleEditPhotoSave();
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

import React from "react";
import { Modal, Button } from "react-bootstrap";

const LogoutInfoModal = ({ logoutShow, setLogoutShow }) => {
  const handleClose = () => {
    setLogoutShow(false);
  };

  return (
    <Modal
      show={logoutShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Authentication reset needed</Modal.Title>
      </Modal.Header>
      <Modal.Body>You have been logged out!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Back to Home Page
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutInfoModal;

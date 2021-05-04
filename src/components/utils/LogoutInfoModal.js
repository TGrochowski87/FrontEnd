import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LogoutInfoModal = ({ logoutShow, setLogoutShow }) => {
  const history = useHistory();

  const handleClose = () => {
    setLogoutShow(false);
    history.push("/");
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

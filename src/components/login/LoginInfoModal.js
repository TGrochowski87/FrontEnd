import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginInfoModal = ({ show, setShow, register }) => {
  const history = useHistory();

  const handleClose = () => {
    setShow(false);
    history.push(`${register ? "/login" : "/"}`);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {register ? "Register status" : "Login status"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {register ? "Registered successfully!" : "Logged in successfully!"}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          {register ? "Log in" : "Back to Home Page"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginInfoModal;

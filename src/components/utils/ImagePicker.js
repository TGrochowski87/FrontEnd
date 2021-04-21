import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

import React, { useState, useEffect } from 'react';

import Dropzone from 'react-dropzone';

import { Container, Col, Row, Modal, Button } from 'react-bootstrap';

const imagePickerCaptions = {
  empty: 'Drag and drop images here, or click to select files',
  picked: 'Choosen files:',
};

const ImagePicker = ({ images, onNewImages }) => {
  const [newImages, setNewImages] = useState(images);
  const [caption, setCaption] = useState(imagePickerCaptions.empty);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleDropAccepted = (acceptedFiles) => {
    setNewImages([...newImages, ...acceptedFiles]);
  };

  const handleDropRejected = () => {
    handleShowModal();
  };

  useEffect(() => {
    setNewImages(images);

    // if falsy or empty
    if (!images || images?.length === 0) {
      setCaption(imagePickerCaptions.empty);
      return;
    }
    // array not empty
    const filesNames = images?.map((file) => ' ' + file.name);
    setCaption(imagePickerCaptions.picked + filesNames);
  }, [images]);

  useEffect(() => {
    onNewImages(newImages);
  }, [newImages, onNewImages]);

  return (
    <>
      <Dropzone
        onDropAccepted={(acceptedFiles) => handleDropAccepted(acceptedFiles)}
        onDropRejected={() => handleDropRejected()}
        accept='image/jpeg, image/png'
      >
        {({ getRootProps, getInputProps }) => (
          <Container
            className='image-picker-wrapper d-flex align-items-center justify-content-center h-100'
            {...getRootProps()}
          >
            <input className='d-none' {...getInputProps()} />
            <Row className='text-center'>
              <Col xs={12} className='px-2 pt-2 pb-1'>
                <PublishOutlinedIcon fontSize='large' />
              </Col>
              <Col xs={12}>
                <div className='text-muted px-2 pt-1 pb-2'>{caption}</div>
              </Col>
            </Row>
          </Container>
        )}
      </Dropzone>
      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>You picked wrong files :(</Modal.Body>
        <Modal.Footer>
          <Button variant='dark' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImagePicker;

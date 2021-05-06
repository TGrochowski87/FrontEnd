import React, { useState, useEffect } from 'react';

import { Button, Carousel, Image, Modal } from 'react-bootstrap';

const ImageCarousel = ({
  images,
  onButtonClick,
  onImageClick,
  carouselHeight,
  buttonIcon,
}) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    setActiveImage(images?.[activeIndex]);
  }, [images, activeIndex]);

  useEffect(() => {
    if (images.length === 0 && activeIndex !== 0) {
      setActiveIndex(0);
    } else if (images.length > 0 && activeIndex >= images.length) {
      setActiveIndex(images.length - 1);
    }
  }, [images]);

  const handleButtonClick = (selectedImage) => {
    if (onButtonClick) onButtonClick(selectedImage);
    else handleShowModal();
  };

  const handleImageClick = (selectedImage) => {
    if (onImageClick) onImageClick(selectedImage);
    else handleShowModal();
  };

  const handleCarouselSelect = (index) => {
    setActiveIndex(index);
  };

  if (!images || images?.length === 0) {
    return (
      <div className='d-flex justify-content-center align-items-center w-100 h-100 text-muted'>
        No images to display
      </div>
    );
  }

  return (
    <>
      <Carousel
        className='image-carosuel w-100'
        style={{ height: carouselHeight }}
        slide={false}
        interval={null}
        activeIndex={activeIndex}
        defaultActiveIndex={0}
        onSelect={handleCarouselSelect}
      >
        {images.map((image, index) => {
          const imageURL =
            image instanceof File ? URL.createObjectURL(image) : image;
          return (
            <Carousel.Item key={index}>
              <div className='d-flex justify-content-center align-items-center h-100'>
                <img
                  className='d-block mw-100'
                  style={{ maxHeight: `calc(${carouselHeight} - 4px)` }}
                  onClick={() => {
                    handleImageClick(activeImage);
                  }}
                  src={imageURL}
                  alt='uploaded'
                />
              </div>
              <Carousel.Caption className='cursor-transparent-caption'>
                <Button
                  className='p-0'
                  variant='outline-dark'
                  type='button'
                  onClick={() => {
                    handleButtonClick(activeImage);
                  }}
                >
                  {buttonIcon}
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      {activeImage && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          animation={false}
          centered
          dialogClassName='modal-lg'
        >
          {activeImage?.name && (
            <Modal.Header closeButton>
              <Modal.Title className='text-muted' style={{ fontSize: '1rem' }}>
                {activeImage.name}
              </Modal.Title>
            </Modal.Header>
          )}
          <Modal.Body className='p-1 d-flex justify-content-center'>
            <Image
              className='mw-100'
              style={{ maxHeight: '444px' }}
              src={
                activeImage instanceof File
                  ? URL.createObjectURL(activeImage)
                  : activeImage
              }
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ImageCarousel;

import React from 'react';

import { Carousel, Modal } from 'react-bootstrap';

const ExpenseDetails = ({ expenseData, show, handleCloseExpenseDetails }) => {
  const carouselHeight = '444px';
  return (
    <Modal
      show={show}
      onHide={handleCloseExpenseDetails}
      animation={false}
      centered
      dialogClassName='modal-lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>Expense details</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-1 d-flex justify-content-center'>
        {expenseData.media?.length !== 0 && (
          <Carousel
            className='expense-details-carousel w-100'
            style={{ maxHeight: carouselHeight }}
            slide={false}
            interval={null}
            defaultActiveIndex={0}
          >
            {expenseData.media.map((image, index) => {
              return (
                <Carousel.Item key={index}>
                  <div className='d-flex justify-content-center align-items-center h-100'>
                    <img
                      className='d-block mw-100'
                      style={{ maxHeight: carouselHeight }}
                      src={image}
                      alt={image}
                    />
                  </div>
                  <Carousel.Caption className='cursor-transparent-caption'></Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseDetails;

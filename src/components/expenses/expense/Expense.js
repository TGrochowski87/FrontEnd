import {
  KeyboardCapslockOutlined,
  DeleteForeverOutlined,
} from '@material-ui/icons';

import React, { useState } from 'react';

import { Col, Button, Row } from 'react-bootstrap';

import ContainerCollapse from './../../utils/ContainerCollapse';
import ImageCarousel from '../../utils/ImageCarousel';

import ExpenseItem from './ExpenseItem';

const Expense = ({ expenseData, icons, onExpenseDelete, onExpensePut }) => {
  const [showingDetails, setShowingDetails] = useState(false);

  const toggleShowingDetails = () => {
    setShowingDetails(!showingDetails);
  };

  return (
    <ContainerCollapse>
      <ContainerCollapse.DynamicHeader onHeaderToggle={toggleShowingDetails}>
        {showingDetails ? (
          <KeyboardCapslockOutlined />
        ) : (
          <ExpenseItem.Container>
            <ExpenseItem.HeaderItem icon={icons?.category}>
              <ExpenseItem.Text data={expenseData?.category} />
            </ExpenseItem.HeaderItem>
            <ExpenseItem.HeaderItem icon={icons?.price}>
              <ExpenseItem.Price data={expenseData?.price} />
            </ExpenseItem.HeaderItem>
            <ExpenseItem.HeaderItem icon={icons?.user}>
              <ExpenseItem.Text data={expenseData?.user} />
            </ExpenseItem.HeaderItem>
          </ExpenseItem.Container>
        )}
      </ContainerCollapse.DynamicHeader>
      <ContainerCollapse.Body className='px-1'>
        <Row noGutters>
          <ExpenseItem.Container>
            <Col xs={12} sm className='my-1'>
              <ExpenseItem icon={icons?.category}>
                <ExpenseItem.Text data={expenseData?.category} />
              </ExpenseItem>
              <ExpenseItem icon={icons?.price}>
                <ExpenseItem.Price data={expenseData?.price} />
              </ExpenseItem>
              <ExpenseItem icon={icons?.user}>
                <ExpenseItem.Text data={expenseData?.user} />
              </ExpenseItem>
              <ExpenseItem icon={icons?.date}>
                <ExpenseItem.Date data={expenseData?.date} />
              </ExpenseItem>
              <ExpenseItem icon={icons?.description}>
                <ExpenseItem.Text data={expenseData?.description} />
              </ExpenseItem>
            </Col>
            <Col xs={12} sm className='my-1'>
              <ImageCarousel
                images={expenseData?.media}
                onButtonClick={(image) => {
                  console.log('remove img: ', image);
                }}
                carouselHeight='125px'
                buttonIcon={<DeleteForeverOutlined />}
              />
            </Col>
            <Col xs={12} sm className='my-1'>
              <Row noGutters className='d-flex justify-content-center my-1'>
                <Button
                  className='w-50'
                  variant='outline-secondary'
                  onClick={() => {
                    console.log(expenseData);
                    onExpenseDelete(expenseData?.id);
                  }}
                >
                  Delete
                </Button>
              </Row>
              <Row noGutters className='d-flex justify-content-center my-1'>
                <Button
                  className='w-50'
                  variant='outline-secondary'
                  onClick={() => {
                    onExpensePut(expenseData?.id);
                  }}
                >
                  Edit
                </Button>
              </Row>
            </Col>
          </ExpenseItem.Container>
        </Row>
      </ContainerCollapse.Body>
    </ContainerCollapse>
  );
};

export default Expense;

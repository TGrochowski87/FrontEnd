import {
  KeyboardCapslockOutlined,
  DeleteForeverOutlined,
} from '@material-ui/icons';

import React, { useState } from 'react';

import { Col, Button, Row } from 'react-bootstrap';

import ContainerCollapse from './../../utils/ContainerCollapse';

import IncomeItem from './IncomeItem';

const Income = ({ incomeData, icons, onIncomeDelete, onIncomePut }) => {
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
          <IncomeItem.Container>
            <IncomeItem.HeaderItem icon={icons?.category}>
              <IncomeItem.Text data={incomeData?.category} />
            </IncomeItem.HeaderItem>
            <IncomeItem.HeaderItem icon={icons?.price}>
              <IncomeItem.Price data={incomeData?.price} />
            </IncomeItem.HeaderItem>
            <IncomeItem.HeaderItem icon={icons?.user}>
              <IncomeItem.Text data={incomeData?.user} />
            </IncomeItem.HeaderItem>
          </IncomeItem.Container>
        )}
      </ContainerCollapse.DynamicHeader>
      <ContainerCollapse.Body className='px-1'>
        <Row noGutters>
          <IncomeItem.Container>
            <Col xs={12} sm className='my-1'>
              <IncomeItem icon={icons?.category}>
                <IncomeItem.Text data={incomeData?.category} />
              </IncomeItem>
              <IncomeItem icon={icons?.price}>
                <IncomeItem.Price data={incomeData?.price} />
              </IncomeItem>
              <IncomeItem icon={icons?.user}>
                <IncomeItem.Text data={incomeData?.user} />
              </IncomeItem>
              <IncomeItem icon={icons?.date}>
                <IncomeItem.Date data={incomeData?.date} />
              </IncomeItem>
            </Col>
            <Col xs={12} sm className='my-1'>
              <Row noGutters className='d-flex justify-content-center my-1'>
                <Button
                  className='w-50'
                  variant='outline-secondary'
                  onClick={() => {
                    console.log(incomeData);
                    onIncomeDelete(incomeData?.id);
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
                    onIncomePut(incomeData?.id);
                  }}
                >
                  Edit
                </Button>
              </Row>
            </Col>
          </IncomeItem.Container>
        </Row>
      </ContainerCollapse.Body>
    </ContainerCollapse>
  );
};

export default Income;

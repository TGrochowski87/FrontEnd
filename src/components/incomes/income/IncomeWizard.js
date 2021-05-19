import React, { useState } from 'react';

import { Form, Button, Col, FormControl } from 'react-bootstrap';

import CurrencyInput from 'react-currency-input-field';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CategoryTypeahead from './../../utils/CategoryTypeahead';
import ContainerCollapse from '../../utils/ContainerCollapse';

const IncomeWizard = ({ onWizardSubmit, title }) => {
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());

  const submitNewIncome = (e) => {
    e.preventDefault();
    const dataPost = {
      date: date.toJSON(),
      categoryId: category?.[0]?.id,
      price,
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(dataPost));
    for (const fd of formData) {
      console.log(fd);
    }
    onWizardSubmit(formData);
  };

  const clearWizard = () => {
    setCategory([]);
    setPrice('');
    setDate(new Date());
  };

  return (
    <ContainerCollapse className='container-overflow-visible my-3'>
      <ContainerCollapse.StaticHeader className='py-3'>
        <h4>{title}</h4>
      </ContainerCollapse.StaticHeader>
      <ContainerCollapse.Body className='p-3'>
        <Form
          className='text-left'
          onSubmit={(e) => {
            submitNewIncome(e);
          }}
        >
          <Form.Row>
            <Form.Group as={Col} md={4} controlId='formGroupCategory'>
              <Form.Label>Category</Form.Label>
              <CategoryTypeahead
                onChange={setCategory}
                selected={category}
                url={'/api/category/incomes/notarchived'}
              />
            </Form.Group>
            <Form.Group as={Col} md={4} controlId='formGroupPrice'>
              <Form.Label>Price</Form.Label>
              <CurrencyInput
                as={FormControl}
                className='form-control'
                id='inputPrice'
                name='inputPrice'
                placeholder='Please enter a value'
                allowNegativeValue={false}
                defaultValue={price}
                value={price}
                decimalsLimit={2}
                decimalScale={2}
                decimalSeparator='.'
                groupSeparator=','
                prefix='$'
                onValueChange={setPrice}
              />
            </Form.Group>
            <Form.Group as={Col} md={4} controlId='formGroupDate'>
              <Form.Label>Date</Form.Label>
              <DatePicker
                as={FormControl}
                className='form-control'
                id='inputDate'
                name='inputDate'
                onChange={(date) => setDate(date)}
                selected={date}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className='justify-content-center'>
            <Button
              variant='outline-secondary'
              className='mx-1'
              style={{ minWidth: '7rem' }}
              onClick={clearWizard}
            >
              Clear
            </Button>
            <Button
              variant='outline-secondary'
              className='mx-1'
              style={{ minWidth: '7rem' }}
              type='submit'
            >
              Submit
            </Button>
          </Form.Row>
        </Form>
      </ContainerCollapse.Body>
    </ContainerCollapse>
  );
};

export default IncomeWizard;

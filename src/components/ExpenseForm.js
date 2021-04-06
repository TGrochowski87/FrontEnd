import React from 'react';
import { useEffect, useState } from 'react';

import { Form, InputGroup, Button, FormControl } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExpenseForm = ({
  submitHandler,
  cancelHandler,
  startDate,
  setStartDate,
  categoryInput,
  setCategoryInput,
  amountInput,
  setAmountInput,
}) => {
  const [availableCategories, setAvailableCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://webhomebudget.azurewebsites.net/api/category/base')
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setAvailableCategories(response);
        });
    };
    fetchData();
  }, []);

  return (
    <Form
      inline
      onSubmit={(event) => {
        submitHandler(event);
      }}
    >
      <InputGroup className='mb-2 mr-sm-2'>
        <Form.Control
          as='select'
          value={categoryInput}
          onChange={(event) => {
            setCategoryInput(event.target.value);
          }}
          className='mb-2 mr-sm-2'
          id='inlineFormInputName2'
          placeholder='Category'
        >
          {availableCategories ? (
            availableCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option>unknown (temporary)</option>
          )}
        </Form.Control>
        <FormControl
          value={amountInput}
          onChange={(event) => {
            setAmountInput(event.target.value);
          }}
          className='mb-2 mr-sm-2'
          id='inlineFormInputGroupUsername2'
          placeholder='Amount'
        />
        <DatePicker
          className='form-control mb-2 mr-sm-2'
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <Button type='submit' className='mb-2 mr-sm-2'>
          Submit
        </Button>
        <Button type='submit' className='mb-2 mr-sm-2' onClick={cancelHandler}>
          Cancel
        </Button>
      </InputGroup>
    </Form>
  );
};

export default ExpenseForm;

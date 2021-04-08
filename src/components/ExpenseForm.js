import React from 'react';
import { useEffect, useState } from 'react';

import { Form, Button, FormControl, Col } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExpenseForm = ({
  submitHandler,
  cancelHandler,
  startDate,
  setStartDate,
  categoryInput,
  setCategoryInput,
  priceInput,
  setPriceInput,
}) => {
  const [categoriesData, setCategoriesData] = useState(null);

  useEffect(() => {
    // funkcja do pobrania nadkategorii
    const fetchCategories = async () => {
      // 2
      const response = await fetch(
        'https://webhomebudget.azurewebsites.net/api/category/base/over'
      );
      const supCategories = await response.json();

      // funkcjia w funkcji do pobrania  podkategorii
      const fetchSubcategories = async () => {
        // 4
        const newCategoriesData = [];
        for (const sup of supCategories) {
          // 5
          const response = await fetch(
            `https://webhomebudget.azurewebsites.net/api/category/base/sub/${sup.id}`
          );
          const subcategories = await response.json();
          subcategories.unshift(sup);
          const dataItem = { ...sup, subcategories };
          newCategoriesData.push(dataItem);
        }

        // 3
        setCategoriesData(newCategoriesData);
      };
      await fetchSubcategories();
    };

    // 1
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoriesData === null) return;

    setCategoryInput(categoriesData[0].id);
  }, [categoriesData, setCategoryInput]);

  return (
    <Form className='w-75'>
      <Form.Row>
        <Col>
          <Form.Control
            as='select'
            value={categoryInput}
            onChange={(event) => setCategoryInput(event.target.value)}
            className='mb-2 mr-sm-2'
            id='categoryInput'
            placeholder='Category'
          >
            {categoriesData ? (
              categoriesData.map((supcategory) => (
                <optgroup key={supcategory.id} label={supcategory.name}>
                  {supcategory.subcategories?.map((subcategory) => {
                    return (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    );
                  })}
                </optgroup>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </Form.Control>
        </Col>
        <Col>
          <FormControl
            value={priceInput}
            onChange={(event) => {
              setPriceInput(event.target.value);
            }}
            className='mb-2 mr-sm-2'
            id='priceInput'
            placeholder='Price'
          />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <DatePicker
            className='form-control mb-2 mr-sm-2'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col>
          <Form.File
            id='fileInput'
            label='Choose image file'
            className='mb-2 mr-sm-2 '
            custom
          ></Form.File>
        </Col>
      </Form.Row>
      <Form.Row className='d-flex flex-row-reverse'>
        <Button
          type='submit'
          className='mb-2 mr-sm-2'
          onClick={(event) => cancelHandler(event)}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          className='mb-2 mr-sm-2'
          onClick={(event) => submitHandler(event)}
        >
          Submit
        </Button>
      </Form.Row>
    </Form>
  );
};

export default ExpenseForm;

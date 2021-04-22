import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import React, { useState, useEffect } from 'react';

import { Form, Button, Col, FormControl } from 'react-bootstrap';

import CurrencyInput from 'react-currency-input-field';

import { Typeahead } from 'react-bootstrap-typeahead';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import useFetch from 'use-http';

import ImageCarousel from './../../utils/ImageCarousel';
import ImagePicker from './../../utils/ImagePicker';

const ExpenseWizard = ({ expensePost }) => {
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [images, setImages] = useState([]);
  const [categoryPlaceholder, setCategoryPlaceholder] = useState(
    'Loading categories'
  );

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoryOptions = [],
  } = useFetch(
    'https://webhomebudget.azurewebsites.net/api/category',
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
      },
    },
    []
  );

  // should be actually in separeate component for typeahead
  useEffect(() => {
    if (categoriesError) setCategoryPlaceholder('Error occured');
    else if (categoriesLoading) setCategoryPlaceholder('Loading categories');
    else setCategoryPlaceholder('Start typing category name...');
  }, [categoriesLoading, categoriesError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataPost = {
      date: date.toJSON(),
      categoryId: category?.[0]?.id,
      price: price,
      budgetId: 1,
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(dataPost));
    images.forEach((img) => {
      formData.append('files', img);
    });

    expensePost(formData);
  };

  const clearWizard = () => {
    setCategory([]);
    setPrice('');
    setDate(new Date());
    setImages([]);
    setCategoryPlaceholder('Start typing category name...');
  };

  return (
    <Form
      className='text-left'
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Form.Row>
        <Form.Group as={Col} md={4} controlId='formGroupCategory'>
          <Form.Label>Category</Form.Label>
          <Typeahead
            disabled={categoriesError || categoriesLoading}
            as={FormControl}
            id='inputCategory'
            labelKey='name'
            onChange={(selected) => setCategory(selected)}
            options={categoryOptions}
            placeholder={categoryPlaceholder}
            selected={category}
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
            defaultValue={price}
            decimalsLimit={2}
            decimalScale={2}
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
      <Form.Row>
        <Form.Group
          as={Col}
          md={4}
          className='d-flex align-items-center'
          controlId='formGroupImagesList'
        >
          <Form.Label srOnly>Images</Form.Label>
          <ImageCarousel
            images={images}
            onButtonClick={(image) => {
              const newImages = images.filter((img) => {
                return JSON.stringify(img) !== JSON.stringify(image);
              });
              setImages(newImages);
            }}
            carouselHeight='125px'
            buttonIcon={<DeleteForeverOutlinedIcon />}
          />
        </Form.Group>
        <Form.Group as={Col} md={8} controlId='formGroupImagesPicker'>
          <Form.Label srOnly>Images</Form.Label>
          <ImagePicker images={images} onNewImages={setImages} />
        </Form.Group>
      </Form.Row>
      <Form.Row className='justify-content-center'>
        <Button
          variant='dark'
          className='mx-1'
          style={{ minWidth: '7rem' }}
          onClick={clearWizard}
        >
          Clear
        </Button>
        <Button
          variant='dark'
          className='mx-1'
          style={{ minWidth: '7rem' }}
          type='submit'
        >
          Submit
        </Button>
      </Form.Row>
    </Form>
  );
};

export default ExpenseWizard;

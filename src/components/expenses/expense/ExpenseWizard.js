import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import React, { useState } from 'react';

import { Form, Button, Col, FormControl } from 'react-bootstrap';

import CurrencyInput from 'react-currency-input-field';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CategoryTypeahead from './../../utils/CategoryTypeahead';
import ContainerCollapse from '../../utils/ContainerCollapse';
import ImageCarousel from './../../utils/ImageCarousel';
import ImagePicker from './../../utils/ImagePicker';

const ExpenseWizard = ({ onWizardSubmit, title }) => {
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const submitNewExpense = (e) => {
    e.preventDefault();
    const dataPost = {
      date: date.toJSON(),
      categoryId: category?.[0]?.id,
      price,
      description,
      budgetId: 1,
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(dataPost));
    images.forEach((img) => {
      formData.append('files', img);
    });
    for (const fd of formData) {
      console.log(fd);
    }
    onWizardSubmit(formData);
  };

  const clearWizard = () => {
    setCategory([]);
    setPrice('');
    setDate(new Date());
    setDescription('');
    setImages([]);
  };

  return (
    <ContainerCollapse className='mt-3 container-overflow-visible'>
      <ContainerCollapse.StaticHeader className='py-3'>
        <h4>{title}</h4>
      </ContainerCollapse.StaticHeader>
      <ContainerCollapse.Body className='p-3'>
        <Form
          className='text-left'
          onSubmit={(e) => {
            submitNewExpense(e);
          }}
        >
          <Form.Row>
            <Form.Group as={Col} md={4} controlId='formGroupCategory'>
              <Form.Label>Category</Form.Label>
              <CategoryTypeahead onChange={setCategory} selected={category} />
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
          <Form.Row>
            <Form.Group as={Col} controlId='formGroupDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={1}
                placeholder='Describe your expense'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
      </ContainerCollapse.Body>
    </ContainerCollapse>
  );
};

export default ExpenseWizard;

import React from 'react';

import 'react-datepicker/dist/react-datepicker.css';

import AddButton from './AddButton';
import ExpenseForm from './ExpenseForm';

const InputSpace = ({
  loadingData,
  inputStatus,
  setInputStatus,
  recordId,
  startDate,
  setStartDate,
  categoryInput,
  setCategoryInput,
  priceInput,
  setPriceInput,
}) => {
  const postHandler = async (event) => {
    event.preventDefault();
    setInputStatus('button');

    const data = {
      date: startDate.toJSON(),
      categoryId: categoryInput,
      price: priceInput,
      budgetId: 1,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    // formData.append('files', "FILE HERE");

    fetch('https://webhomebudget.azurewebsites.net/api/expenses', {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        loadingData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putHandler = async (event) => {
    event.preventDefault();
    setInputStatus('button');

    const data = {
      id: recordId,
      date: startDate.toJSON(),
      categoryId: categoryInput,
      price: priceInput,
      budgetId: 1,
    };

    fetch(`https://webhomebudget.azurewebsites.net/api/expenses/${recordId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(() => {
        loadingData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addHandler = (data) => {
    setInputStatus('add');
  };

  const cancelHandler = () => {
    setStartDate(new Date());
    setCategoryInput('');
    setPriceInput('');
    setInputStatus('button');
  };

  switch (inputStatus) {
    case 'add':
      return (
        <ExpenseForm
          submitHandler={postHandler}
          cancelHandler={cancelHandler}
          startDate={startDate}
          setStartDate={setStartDate}
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          priceInput={priceInput}
          setPriceInput={setPriceInput}
        />
      );
    case 'edit':
      return (
        <ExpenseForm
          submitHandler={putHandler}
          cancelHandler={cancelHandler}
          startDate={startDate}
          setStartDate={setStartDate}
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          priceInput={priceInput}
          setPriceInput={setPriceInput}
        />
      );
    default:
      return (
        <div className='button-space'>
          <AddButton addHandler={addHandler} />
        </div>
      );
  }
};

export default InputSpace;

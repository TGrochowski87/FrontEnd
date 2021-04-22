import {
  CategoryOutlined,
  EventOutlined,
  MonetizationOnOutlined,
  PersonAddOutlined,
} from '@material-ui/icons';

import React, { useEffect, useState } from 'react';

import { Container, Spinner, Button } from 'react-bootstrap';

import useFetch from 'use-http';

import ConatinerWithHeader from './ConatinerWithHeader';

import ExpenseWizard from './expense/ExpenseWizard';
import ExpensesTab from './expensesTab/ExpensesTab';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [getPage, setGetPage] = useState(1);

  const icons = {
    category: <CategoryOutlined fontSize='small' />,
    price: <MonetizationOnOutlined fontSize='small' />,
    date: <EventOutlined fontSize='small' />,
    author: <PersonAddOutlined fontSize='small' />,
  };

  const {
    get,
    post,
    // put,
    // del,
    loading: expensesLoading,
    error: expensesError,
    response,
  } = useFetch(`https://webhomebudget.azurewebsites.net/api/budget/expenses`, {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
    },
    cachePolicy: 'no-cache',
  });

  // const expenseGet = useCallback(async () => {
  //   const newExpenses = await get(`/page/${getPage}`);
  //   if (response.ok) {
  //     if (newExpenses.length < entriesPerPage) return;
  //     setExpenses([...expenses, ...newExpenses]);
  //     setGetPage(getPage + 1);
  //     console.log(getPage);
  //     console.log(newExpenses);
  //   }
  // }, [get, setExpenses, response]);

  const expenseGet = async () => {
    const newExpenses = await get(`/page/${getPage}`);
    if (response.ok)
      if (newExpenses.length !== 0) {
        setGetPage(getPage + 1);
        setExpenses([...expenses, ...newExpenses]);
        console.log('getset');
      }
    // console.log(getPage);
    // console.log(newExpenses);
  };

  const expensePost = async (formData) => {
    await post(formData);
    if (response.ok) expenseGet();
  };

  // const expensePut = async (id, formData) => {
  //   await put()
  // };

  // const expenseDelete = async (id) => {
  //   await del(`/${id}`);
  // };

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  const onFetchErrorComponent = <div>Data fetching error</div>;
  const onFetchLoadingComponent = <Spinner animation='border' />;
  const onFetchLoadedComponent = (
    <>
      <Button
        className='my-2'
        onClick={(e) => {
          e.preventDefault();
          expenseGet();
        }}
      >
        GET 5 MORE
      </Button>
      <ExpensesTab
        title='Today'
        expensesData={expenses?.filter((expense) => {
          const expenseDate = new Date(expense?.date).toDateString();
          const yesterdayDate = new Date().toDateString();
          return expenseDate === yesterdayDate;
        })}
        icons={icons}
      />
      <ExpensesTab
        title='Yesterday'
        expensesData={expenses?.filter((expense) => {
          const expenseDate = new Date(expense?.date).toDateString();
          const yesterdayDate = new Date(Date.now() - 86400000).toDateString();
          return expenseDate === yesterdayDate;
        })}
        expenses={null}
        icons={icons}
      />
      <ExpensesTab title='All' expensesData={expenses} icons={icons} />
    </>
  );

  return (
    <Container className='my-5'>
      <ConatinerWithHeader>
        {{
          header: <h4>Add new expense</h4>,
          body: <ExpenseWizard expensePost={expensePost} />,
        }}
      </ConatinerWithHeader>
      <ConatinerWithHeader>
        {expensesError
          ? {
              header: <h4>Error</h4>,
              body: onFetchErrorComponent,
            }
          : expensesLoading
          ? {
              header: <h4>Loading expenses list</h4>,
              body: onFetchLoadingComponent,
            }
          : { header: <h4>Expenses list</h4>, body: onFetchLoadedComponent }}
      </ConatinerWithHeader>
    </Container>
  );
};

export default ExpensesPage;

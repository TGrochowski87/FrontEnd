import {
  CategoryOutlined,
  EventOutlined,
  MonetizationOnOutlined,
  PersonAddOutlined,
} from '@material-ui/icons';

import React, { useEffect, useState } from 'react';

import { Container, Spinner, Button } from 'react-bootstrap';

import useFetch from 'use-http';

import FilterPanel from '../filters/FilterPanel';
import ContainerCard from '../utils/ContainerCard';
import ContainerCollapse from '../utils/ContainerCollapse';

import ExpenseWizard from './expense/ExpenseWizard';
import ExpensesList from './expensesList/ExpensesList';
import ExpensesListHeader from './expensesList/ExpensesListHeader';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isScrolled, setIsScrolled] = useState(false);

  const [getPage, setGetPage] = useState(1);
  const [hasMoreExpensesToFetch, setHasMoreExpensesToFetch] = useState(true);

  window.addEventListener('scroll', (event) => {
    if (window.scrollY / window.screenY > 0.13) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

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
  } = useFetch(`https://webhomebudget.azurewebsites.net/api`, {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
    },
    cachePolicy: 'no-cache',
  });

  const categoryGet = async () => {
    const categories = await get('/category/over');
    if (response.ok) {
      let newCategoriesData = [];
      for (let cat of categories) {
        const subcategories = await get(`/category/sub/${cat.id}`);
        if (response.ok) {
          newCategoriesData.push({ ...cat, subcategories });
        }
      }
      setCategories(newCategoriesData);
    }
  };

  const expensePost = async (formData) => {
    await post('/budget/expenses', formData);
    if (response.ok) expenseGet();
  };

  useEffect(() => {
    categoryGet();
    expenseGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expenseGet = async () => {
    const newExpenses = await get(`/budget/expenses/page/${getPage}`);
    if (response.ok)
      if (newExpenses.length !== 0) {
        setGetPage(getPage + 1);
        setExpenses([...expenses, ...newExpenses]);
      } else {
        setHasMoreExpensesToFetch(false);
      }
  };

  // const expensePut = async (id, formData) => {
  //   await put()
  // };

  // const expenseDelete = async (id) => {
  //   await del(`/${id}`);
  // };

  const onFetchErrorComponent = (
    <ContainerCard>
      <ContainerCard.Header>
        <h4>Error</h4>
      </ContainerCard.Header>
      <ContainerCard.Body>
        <h4>An error occured</h4>
      </ContainerCard.Body>
    </ContainerCard>
  );

  const onFetchLoadingComponent = (
    <ContainerCard>
      <ContainerCard.Header>
        <h4>Loading expenses</h4>
      </ContainerCard.Header>
      <ContainerCard.Body>
        <Spinner className='my-1' animation='border' />
      </ContainerCard.Body>
    </ContainerCard>
  );

  const onFetchLoadedComponent = (
    <ContainerCard>
      <ContainerCard.Header>
        <ExpensesListHeader icons={icons}>
          <h4>Expenses</h4>
        </ExpensesListHeader>
      </ContainerCard.Header>
      <ContainerCard.Body>
        <ExpensesList
          title='All'
          expensesData={filteredExpenses}
          icons={icons}
          loadMoreExpenses={expenseGet}
          hasMoreExpensesToFetch={hasMoreExpensesToFetch}
        />
      </ContainerCard.Body>
    </ContainerCard>
  );

  return (
    <>
      <FilterPanel
        categories={categories}
        isScrolled={isScrolled}
        expenses={expenses}
        setFilteredExpenses={setFilteredExpenses}
      />
      <Container className='my-5'>
        <Button
          onClick={() => {
            expenseGet();
          }}
        >
          {'Fetch expenses (Debug mode)'}
        </Button>
        <ContainerCollapse>
          <ContainerCollapse.Header>
            <h4>Add new expense</h4>
          </ContainerCollapse.Header>
          <ContainerCollapse.Body>
            <ExpenseWizard expensePost={expensePost} />
          </ContainerCollapse.Body>
        </ContainerCollapse>
        {expensesError
          ? onFetchErrorComponent
          : expensesLoading
          ? onFetchLoadingComponent
          : onFetchLoadedComponent}
      </Container>
    </>
  );
};

export default ExpensesPage;

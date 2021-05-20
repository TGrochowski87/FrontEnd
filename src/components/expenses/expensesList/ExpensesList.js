import {
  CategoryOutlined,
  EventOutlined,
  MonetizationOnOutlined,
  PersonAddOutlined,
  DescriptionOutlined,
} from '@material-ui/icons';

import React, { useState, useEffect } from 'react';

import { Spinner } from 'react-bootstrap';

import InfiniteScroll from 'react-infinite-scroll-component';

import useFetch from 'use-http';

import Expense from './../expense/Expense';
import ExpenseItem from './../expense/ExpenseItem';
import ExpenseWizard from '../expense/ExpenseWizard';
import FilterPanel from '../../filters/FilterPanel';
import ContainerCard from '../../utils/ContainerCard';

import ExpensesListHeader from './ExpensesListHeader';
import ExpensesListRecord from './ExpensesListRecord';

const ExpensesList = () => {
  const [categories] = useState([]);

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const [expensesPage, setExpensesPage] = useState(1);
  const [expensesPerPage] = useState(30);
  const [hasMoreExpensesToFetch, setHasMoreExpensesToFetch] = useState(true);

  const icons = {
    category: <CategoryOutlined fontSize='small' />,
    price: <MonetizationOnOutlined fontSize='small' />,
    date: <EventOutlined fontSize='small' />,
    user: <PersonAddOutlined fontSize='small' />,
    description: <DescriptionOutlined fontSize='small' />,
  };

  const { get, post, del, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api`,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('userToken'),
      },
      cachePolicy: 'no-cache',
    }
  );

  const expenseGet = async () => {
    const newExpenses = await get(
      `/budget/expenses/page/${expensesPage}/${expensesPerPage}`
    );
    if (response.ok) {
      if (expensesPage <= newExpenses.maxPage) {
        setExpensesPage(expensesPage + 1);
        setExpenses([...expenses, ...newExpenses.expensesOnPage]);
      } else {
        setHasMoreExpensesToFetch(false);
      }
    }
  };

  const expensePost = async (formData) => {
    console.log(formData);
    await post('/budget/expenses', formData);
    if (response.ok) {
      console.log('response ok, expense post should refresh expenses');
      if (expenses.length < expensesPerPage) {
        expenseGetRefresh(expenses.length + 1);
      } else {
        expenseGetRefresh(expenses.length - 1);
      }
    } else {
      console.log(
        'response not ok, expense post should inform user about failure'
      );
    }
  };

  const expenseDelete = async (id) => {
    console.log(id);
    await del(`/budget/expenses/${id}`);
    if (response.ok) {
      console.log(expenses.length);
      expenseGetRefresh(expenses.length);
    }
  };

  const expensePut = async (id) => {
    // expenseGetRefresh(expenses.length);
  };

  const expenseGetRefresh = async (numberOfExpenses) => {
    const newExpenses = await get(
      `/budget/expenses/page/1/${numberOfExpenses}`
    );
    if (response.ok) {
      console.log('expense get response ok, new expenses: ', newExpenses);
      setExpenses([...newExpenses.expensesOnPage]);
    } else {
      console.log('expense get response not ok, new expenses: ', newExpenses);
    }
  };

  useEffect(() => {
    expenseGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FilterPanel
        categories={categories}
        expenses={expenses}
        setFilteredExpenses={setFilteredExpenses}
      />
      <ExpenseWizard title="New expense" onWizardSubmit={expensePost} />
      <ContainerCard>
        <ContainerCard.Header>
          <ExpensesListHeader icons={icons}>
            <h4 className='py-2'>Expenses</h4>
          </ExpensesListHeader>
        </ContainerCard.Header>
        <ContainerCard.Body>
          <InfiniteScroll
            className='no-scrollbar'
            height={window.innerHeight * 0.75}
            dataLength={filteredExpenses.length}
            next={expenseGet}
            hasMore={hasMoreExpensesToFetch}
            scrollThreshold={1.0}
            loader={
              <ExpensesListRecord className='py-1'>
                <Spinner animation='border' />
              </ExpensesListRecord>
            }
            endMessage={
              <ExpensesListRecord className='py-2'>
                <p className='text-muted font-italic'>No more records</p>
              </ExpensesListRecord>
            }
          >
            {filteredExpenses &&
              filteredExpenses?.length !== 0 &&
              (function () {
                let lastDate = new Date().toDateString();
                return filteredExpenses.map((filteredExpense, index) => {
                  const expenseDate = new Date(
                    filteredExpense.date
                  ).toDateString();
                  const addSeparator = lastDate !== expenseDate;
                  if (addSeparator) lastDate = expenseDate;
                  return (
                    <React.Fragment key={index}>
                      {addSeparator && (
                        <ExpensesListRecord className='py-2 text-muted record-date'>
                          <ExpenseItem icon={icons?.date}>
                            <ExpenseItem.Date data={filteredExpense?.date} />
                          </ExpenseItem>
                        </ExpensesListRecord>
                      )}
                      <ExpensesListRecord
                        key={filteredExpense.id}
                        className='record-item'
                      >
                        <Expense
                          expenseData={filteredExpense}
                          icons={icons}
                          onExpenseDelete={expenseDelete}
                          onExpensePut={expensePut}
                        />
                      </ExpensesListRecord>
                    </React.Fragment>
                  );
                });
              })()}
          </InfiniteScroll>
        </ContainerCard.Body>
      </ContainerCard>
    </>
  );
};
export default ExpensesList;

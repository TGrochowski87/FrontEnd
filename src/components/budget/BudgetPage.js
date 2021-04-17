import {
  CategoryOutlined,
  EventOutlined,
  MonetizationOnOutlined,
  PersonAddOutlined,
} from '@material-ui/icons';

import React, { useEffect, useState } from 'react';

import { Container, Spinner } from 'react-bootstrap';

import BudgetList from './BudgetList';

import BudgetTab from './budgetTab/BudgetTab';

const BudgetPage = () => {
  const [data, setData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const icons = {
    category: <CategoryOutlined fontSize='small' />,
    price: <MonetizationOnOutlined fontSize='small' />,
    date: <EventOutlined fontSize='small' />,
    author: <PersonAddOutlined fontSize='small' />,
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const fetchData = () => {
    const fetchUrl = async (url) => {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setIsDataLoading(false);
    };

    try {
      setIsDataLoading(true);
      fetchUrl(`https://webhomebudget.azurewebsites.net/api/expenses`);
    } catch (error) {
      console.log(error);
    }
  };

  const onDataLoadingComponent = <Spinner animation='border' />;
  const onDataLoadedComponent = (
    <>
      <BudgetTab title='Today' entries={data} icons={icons} />
      <BudgetTab title='Yesterday' entries={null} icons={icons} />
      <BudgetTab title='Earlier' entries={data} icons={icons} />
    </>
  );

  return (
    <Container className='my-5'>
      <BudgetList title='Expenses List'>
        {isDataLoading ? onDataLoadingComponent : onDataLoadedComponent}
      </BudgetList>
    </Container>
  );
};

export default BudgetPage;

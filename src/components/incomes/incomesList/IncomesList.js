import {
  CategoryOutlined,
  EventOutlined,
  MonetizationOnOutlined,
  PersonAddOutlined,
} from '@material-ui/icons';

import React, { useState, useEffect } from 'react';

import { Spinner } from 'react-bootstrap';

import InfiniteScroll from 'react-infinite-scroll-component';

import useFetch from 'use-http';

import Income from '../income/Income';
import IncomeItem from '../income/IncomeItem';
import IncomeWizard from '../income/IncomeWizard';
import ContainerCard from '../../utils/ContainerCard';

import IncomesListHeader from './IncomesListHeader';
import IncomesListRecord from './IncomesListRecord';

const IncomesList = () => {
  const [incomes, setIncomes] = useState([]);

  const [incomesPage, setIncomesPage] = useState(1);
  const [incomesPerPage] = useState(30);
  const [hasMoreIncomesToFetch, setHasMoreIncomesToFetch] = useState(true);

  const icons = {
    category: <CategoryOutlined fontSize='small' />,
    price: <MonetizationOnOutlined fontSize='small' />,
    date: <EventOutlined fontSize='small' />,
    user: <PersonAddOutlined fontSize='small' />,
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

  const incomeGet = async () => {
    const newIncomes = await get(
      `/budget/incomes/page/${incomesPage}/${incomesPerPage}`
    );

    if (response.ok) {
      if (incomesPage <= newIncomes.maxPage) {
        setIncomesPage(incomesPage + 1);
        setIncomes([...incomes, ...newIncomes.incomesOnPage]);
      } else {
        setHasMoreIncomesToFetch(false);
      }
    }
  };

  const incomePost = async (formData) => {
    console.log(formData);
    await post('/budget/incomes', formData);
    if (response.ok) {
      console.log('response ok, income post should refresh incomes');
      incomeGetRefresh(incomes.length - 1);
    } else {
      console.log(
        'response not ok, income post should inform user about failure'
      );
    }
  };

  const incomeDelete = async (id) => {
    console.log(id);
    await del(`/budget/incomes/${id}`);
    if (response.ok) {
      console.log('income delete: ', id);
      incomeGetRefresh(incomes.length);
    }
  };

  const incomePut = async (id) => {
    incomeGetRefresh(incomes.length);
  };

  const incomeGetRefresh = async (numberOfIncomes) => {
    const newIncomes = await get(`/budget/incomes/page/1/${numberOfIncomes}`);
    if (response.ok) {
      console.log('income get respone ok, new incomes: ', newIncomes);
      setIncomes([...newIncomes.incomesOnPage]);
    } else {
      console.log('income get respone not ok, new incomes: ', newIncomes);
    }
  };

  useEffect(() => {
    incomeGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <IncomeWizard title='New income' onWizardSubmit={incomePost} />
      <ContainerCard className=''>
        <ContainerCard.Header>
          <IncomesListHeader icons={icons}>
            <h4 className='py-2'>Incomes</h4>
          </IncomesListHeader>
        </ContainerCard.Header>
        <ContainerCard.Body>
          <InfiniteScroll
            className='no-scrollbar'
            height={window.innerHeight * 0.75}
            dataLength={incomes.length}
            next={incomeGet}
            hasMore={hasMoreIncomesToFetch}
            scrollThreshold={1.0}
            loader={
              <IncomesListRecord className='py-1'>
                <Spinner animation='border' />
              </IncomesListRecord>
            }
            endMessage={
              <IncomesListRecord className='py-2'>
                <p className='text-muted font-italic'>No more records</p>
              </IncomesListRecord>
            }
          >
            {incomes &&
              incomes?.length !== 0 &&
              (function () {
                let lastDate = new Date().toDateString();
                return incomes.map((income, index) => {
                  const incomeDate = new Date(income.date).toDateString();
                  const addSeparator = lastDate !== incomeDate;
                  if (addSeparator) lastDate = incomeDate;
                  return (
                    <React.Fragment key={index}>
                      {addSeparator && (
                        <IncomesListRecord className='py-2 text-muted record-date'>
                          <IncomeItem icon={icons?.date}>
                            <IncomeItem.Date data={income?.date} />
                          </IncomeItem>
                        </IncomesListRecord>
                      )}
                      <IncomesListRecord
                        key={income.id}
                        className='record-item'
                      >
                        <Income
                          incomeData={income}
                          icons={icons}
                          onIncomeDelete={incomeDelete}
                          onIncomePut={incomePut}
                        />
                      </IncomesListRecord>
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
export default IncomesList;

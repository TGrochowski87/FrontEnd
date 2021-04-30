import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import Expense from './../expense/Expense';

import ExpensesListRecord from './ExpensesListRecord';
import ExpensesListSeparator from './ExpensesListSeparator';

const ExpensesList = ({
  expensesData,
  icons,
  loadMoreExpenses,
  hasMoreExpensesToFetch,
}) => {
  return (
    <InfiniteScroll
      dataLength={expensesData.length} //This is important field to render the next data
      next={loadMoreExpenses}
      hasMore={hasMoreExpensesToFetch}
      loader={<h4>Loading...</h4>}
      height={window.innerHeight * 0.75}
      scrollThreshold={0.9}
      endMessage={
        <ExpensesListSeparator>
          <h5 className='my-2'>No more records</h5>
        </ExpensesListSeparator>
      }
    >
      {expensesData && expensesData?.length !== 0 ? (
        expensesData.map((expenseData, index) => {
          return (
            <ExpensesListRecord>
              <Expense key={index} expenseData={expenseData} icons={icons} />
            </ExpensesListRecord>
          );
        })
      ) : (
        <ExpensesListSeparator>
          <h5 className='my-2'>No records</h5>
        </ExpensesListSeparator>
      )}
    </InfiniteScroll>
  );

  // return expensesData && expensesData?.length !== 0 ? (
  //   expensesData.map((expenseData, index) => {
  //     return (
  //       <ExpensesListRecord>
  //         <Expense key={index} expenseData={expenseData} icons={icons} />
  //       </ExpensesListRecord>
  //     );
  //   })
  // ) : (
  //   <ExpensesListSeparator>
  //     <h5 className='my-2'>No records</h5>
  //   </ExpensesListSeparator>
  // );
};
export default ExpensesList;

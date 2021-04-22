import React, { useState } from 'react';

import ExpenseDetails from '../../expense/ExpenseDetails';

import ExpensesTabEntryContainer from './ExpensesTabEntryContainer';

import ExpensesTabEntryItem from './expensesTabEntryItem/ExpensesTabEntryItem';

const ExpensesTabEntry = ({ children, expenseData }) => {
  const [showExpenseDetails, setExpenseDetails] = useState(false);

  const handleCloseExpenseDetails = () => setExpenseDetails(false);
  const handleShowExpenseDetails = () => setExpenseDetails(true);

  return (
    <>
      <ExpensesTabEntryContainer onClick={handleShowExpenseDetails}>
        {children}
      </ExpensesTabEntryContainer>
      <ExpenseDetails
        expenseData={expenseData}
        show={showExpenseDetails}
        handleCloseExpenseDetails={handleCloseExpenseDetails}
      />
    </>
  );
};

ExpensesTabEntry.Item = ExpensesTabEntryItem;

export default ExpensesTabEntry;

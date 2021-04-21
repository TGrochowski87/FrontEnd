import React from 'react';

import ExpensesTabEntryContainer from './ExpensesTabEntryContainer';

import ExpensesTabEntryItem from './expensesTabEntryItem/ExpensesTabEntryItem';

const ExpensesTabEntry = ({ children, onClick }) => {
  return (
    <ExpensesTabEntryContainer onClick={onClick}>
      {children}
    </ExpensesTabEntryContainer>
  );
};

ExpensesTabEntry.Item = ExpensesTabEntryItem;

export default ExpensesTabEntry;

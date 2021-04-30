import React from 'react';

import ExpensesListRecord from './ExpensesListRecord';

const ExpensesListSeparator = ({ children }) => {
  return <ExpensesListRecord>{children}</ExpensesListRecord>;
};

export default ExpensesListSeparator;

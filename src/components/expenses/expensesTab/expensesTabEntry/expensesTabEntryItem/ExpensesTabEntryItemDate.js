import React from 'react';

const ExpensesTabEntryItemDate = ({ data }) => {
  if (data) {
    return <span>{new Date(data).toLocaleDateString()}</span>;
  }
  return <span>No data</span>;
};

export default ExpensesTabEntryItemDate;

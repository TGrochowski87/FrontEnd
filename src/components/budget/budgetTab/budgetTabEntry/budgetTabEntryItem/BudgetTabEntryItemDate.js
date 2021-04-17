import React from 'react';

const BudgetTabEntryItemDate = ({ data }) => {
  if (data) {
    return <span>{new Date(data).toLocaleDateString()}</span>;
  }
  return <span>No data</span>;
};

export default BudgetTabEntryItemDate;

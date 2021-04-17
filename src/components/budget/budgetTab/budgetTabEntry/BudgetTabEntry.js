import React from 'react';

import BudgetTabEntryContainer from './BudgetTabEntryContainer';

import BudgetTabEntryItem from './budgetTabEntryItem/BudgetTabEntryItem';

const BudgetTabEntry = ({ children }) => {
  return <BudgetTabEntryContainer>{children}</BudgetTabEntryContainer>;
};

BudgetTabEntry.Item = BudgetTabEntryItem;

export default BudgetTabEntry;

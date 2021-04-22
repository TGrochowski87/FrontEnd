import React from 'react';

import ExpensesTabContainer from './expensesTabContainer/ExpensesTabContainer';
import ExpensesTabEntry from './expensesTabEntry/ExpensesTabEntry';
import ExpensesTabEntryItem from './expensesTabEntry/expensesTabEntryItem/ExpensesTabEntryItem';

const ExpensesTab = ({ title, expensesData, icons }) => {
  let childComponent;
  if (expensesData && expensesData?.length !== 0) {
    childComponent = expensesData.map((expenseData, index) => {
      return (
        <ExpensesTabEntry key={index} expenseData={expenseData} icons={icons}>
          <ExpensesTabEntry.Item itemIcon={icons.category}>
            <ExpensesTabEntryItem.Text data={expenseData.category} />
          </ExpensesTabEntry.Item>
          <ExpensesTabEntry.Item itemIcon={icons.price}>
            <ExpensesTabEntryItem.Price data={expenseData.price} />
          </ExpensesTabEntry.Item>
          <ExpensesTabEntry.Item itemIcon={icons.date}>
            <ExpensesTabEntryItem.Date data={expenseData.date} />
          </ExpensesTabEntry.Item>
          <ExpensesTabEntry.Item itemIcon={icons.author}>
            <ExpensesTabEntryItem.Text data={expenseData.author} />
          </ExpensesTabEntry.Item>
        </ExpensesTabEntry>
      );
    });
  } else {
    childComponent = (
      <ExpensesTabContainer.Text>
        No entries for this time period
      </ExpensesTabContainer.Text>
    );
  }

  return (
    <ExpensesTabContainer>
      <ExpensesTabContainer.Header headerText={title} icons={icons} />
      <ExpensesTabContainer.Body>{childComponent}</ExpensesTabContainer.Body>
    </ExpensesTabContainer>
  );
};

export default ExpensesTab;

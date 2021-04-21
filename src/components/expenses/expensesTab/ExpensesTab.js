import React from 'react';

import ExpensesTabContainer from './expensesTabContainer/ExpensesTabContainer';
import ExpensesTabEntry from './expensesTabEntry/ExpensesTabEntry';
import ExpensesTabEntryItem from './expensesTabEntry/expensesTabEntryItem/ExpensesTabEntryItem';

const ExpensesTab = ({ title, entries, icons }) => {
  let childComponent;
  if (entries) {
    childComponent =
      // <InfiniteScroll
      //   dataLength={10} //This is important field to render the next data
      //   next={() => {
      //     console.log('next');
      //   }}
      //   hasMore={true}
      //   // loader={<Spinner animation='border' />}
      //   loader={<p>Loading...</p>}
      //   endMessage={<p>End</p>}
      // >
      entries.map((entry) => {
        return (
          <ExpensesTabEntry
            key={entry.id}
            entry={entry}
            icons={icons}
            onClick={() => {
              console.log('ENTRY DETAILS: ' + JSON.stringify(entry));
            }}
          >
            <ExpensesTabEntry.Item itemIcon={icons.category}>
              <ExpensesTabEntryItem.Text data={entry.category} />
            </ExpensesTabEntry.Item>
            <ExpensesTabEntry.Item itemIcon={icons.price}>
              <ExpensesTabEntryItem.Price data={entry.price} />
            </ExpensesTabEntry.Item>
            <ExpensesTabEntry.Item itemIcon={icons.date}>
              <ExpensesTabEntryItem.Date data={entry.date} />
            </ExpensesTabEntry.Item>
            <ExpensesTabEntry.Item itemIcon={icons.author}>
              <ExpensesTabEntryItem.Text data={entry.author} />
            </ExpensesTabEntry.Item>
          </ExpensesTabEntry>
        );
      });
    // </InfiniteScroll>
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

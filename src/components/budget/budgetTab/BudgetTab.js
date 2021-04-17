import React from 'react';

import { Spinner } from 'react-bootstrap';

import InfiniteScroll from 'react-infinite-scroll-component';

import BudgetTabContainer from './budgetTabContainer/BudgetTabContainer';
import BudgetTabEntry from './budgetTabEntry/BudgetTabEntry';
import BudgetTabEntryItem from './budgetTabEntry/budgetTabEntryItem/BudgetTabEntryItem';

const BudgetTab = ({ title, entries, icons }) => {
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
          <BudgetTabEntry key={entry.id} entry={entry} icons={icons}>
            <BudgetTabEntry.Item>
              {icons.category}
              <BudgetTabEntryItem.Text data={entry.category} />
            </BudgetTabEntry.Item>
            <BudgetTabEntry.Item>
              {icons.price}
              <BudgetTabEntryItem.Price data={entry.price} />
            </BudgetTabEntry.Item>
            <BudgetTabEntry.Item>
              {icons.date}
              <BudgetTabEntryItem.Date data={entry.date} />
            </BudgetTabEntry.Item>
            <BudgetTabEntry.Item>
              {icons.author}
              <BudgetTabEntryItem.Text data={entry.author} />
            </BudgetTabEntry.Item>
          </BudgetTabEntry>
        );
      });
    // </InfiniteScroll>
  } else {
    childComponent = (
      <BudgetTabContainer.Text>
        No entries for this time period
      </BudgetTabContainer.Text>
    );
  }

  return (
    <BudgetTabContainer>
      <BudgetTabContainer.Header headerText={title} icons={icons} />
      <BudgetTabContainer.Body>{childComponent}</BudgetTabContainer.Body>
    </BudgetTabContainer>
  );
};

export default BudgetTab;

import React from 'react';

import NumberFormat from 'react-number-format';

const BudgetTabEntryItemPrice = ({ data }) => {
  if (data) {
    return (
      <NumberFormat
        value={data}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
        decimalScale={2}
        fixedDecimalScale
      />
    );
  }
  return <span>No data</span>;
};

export default BudgetTabEntryItemPrice;

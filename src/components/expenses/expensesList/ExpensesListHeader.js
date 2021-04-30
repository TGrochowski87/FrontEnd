import React from 'react';

import { Row } from 'react-bootstrap';

const ExpensesListHeader = ({ children, icons }) => {
  return (
    <>
      {children}
      <Row noGutters className='d-none d-sm-flex justify-content-around'>
        {icons.category}
        {icons.price}
        {icons.date}
        {icons.author}
      </Row>
    </>
  );
};

export default ExpensesListHeader;

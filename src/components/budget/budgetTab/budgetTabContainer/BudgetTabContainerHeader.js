import React from 'react';

import { Row } from 'react-bootstrap';

const BudgetTabContainerHeader = ({ headerText, icons }) => {
  return (
    <>
      <h5>{headerText}</h5>
      <Row noGutters className='d-none d-sm-flex justify-content-around'>
        {icons.category}
        {icons.price}
        {icons.date}
        {icons.author}
      </Row>
    </>
  );
};

export default BudgetTabContainerHeader;

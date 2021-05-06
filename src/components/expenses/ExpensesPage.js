import React, { useState } from "react";

import { Container } from "react-bootstrap";

import ExpensesList from "./expensesList/ExpensesList";

const ExpensesPage = () => {
  return (
    <Container className="my-3">
      <ExpensesList />
    </Container>
  );
};

export default ExpensesPage;

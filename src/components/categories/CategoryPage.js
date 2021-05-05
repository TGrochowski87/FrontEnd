import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import CategoryExpenseList from "./expenses/CategoryExpenseList";
import CategoryIncomeList from "./incomes/CategoryIncomeList";
import useFetch from "use-http";

const CategoryPage = () => {
  return (
    <div className="category-page">
      <CategoryExpenseList />
      <CategoryIncomeList />
    </div>
  );
};

export default CategoryPage;

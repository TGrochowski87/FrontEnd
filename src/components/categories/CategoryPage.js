import React from "react";
import CategoryExpenseList from "./expenses/CategoryExpenseList";
import CategoryIncomeList from "./incomes/CategoryIncomeList";

const CategoryPage = () => {
  return (
    <div className="category-page">
      <CategoryExpenseList />
      <CategoryIncomeList />
    </div>
  );
};

export default CategoryPage;

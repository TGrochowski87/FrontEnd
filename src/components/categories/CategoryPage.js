import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import CategoryExpenseList from "./expenses/CategoryExpenseList";
import CategoryIncomeList from "./incomes/CategoryIncomeList";
import useFetch from "use-http";

const CategoryPage = () => {
  const [categoriesExpenses, setCategoriesExpenses] = useState([]);
  const [categoriesIncomes, setCategoriesIncomes] = useState([]);

  const { get, loading, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/category`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

  const categoryExpensesGet = async () => {
    const categories = await get("/expense/over");
    if (response.ok) {
      let newCategoriesData = [];
      for (let cat of categories) {
        const subcategories = await get(`/expense/sub/${cat.id}`);
        if (response.ok) {
          newCategoriesData.push({ ...cat, subcategories });
        }
      }
      setCategoriesExpenses(newCategoriesData);
    }
  };

  const categoryIncomesGet = async () => {
    const categories = await get("/incomes");
    if (response.ok) {
      console.log(categories);
      setCategoriesIncomes(categories);
    }
  };

  useEffect(() => {
    categoryExpensesGet();
    categoryIncomesGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="category-page">
      {loading ? (
        <Spinner animation="border" variant="light" />
      ) : (
        <>
          <CategoryExpenseList
            categories={categoriesExpenses}
            categoryGet={categoryExpensesGet}
          />
          <CategoryIncomeList
            categories={categoriesIncomes}
            categoryGet={categoryIncomesGet}
          />
        </>
      )}
    </div>
  );
};

export default CategoryPage;

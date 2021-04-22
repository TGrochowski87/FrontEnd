import {
  CategoryOutlined,
  EventOutlined,
  MonetizationOnOutlined,
  PersonAddOutlined,
} from "@material-ui/icons";

import React, { useCallback, useEffect, useState } from "react";

import { Container, Spinner } from "react-bootstrap";

import useFetch from "use-http";

import ConatinerWithHeader from "./ConatinerWithHeader";

import ExpenseWizard from "./expense/ExpenseWizard";
import ExpensesTab from "./expensesTab/ExpensesTab";

import FilterPanel from "../filters/FilterPanel";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isScrolled, setIsScrolled] = useState(false);

  window.addEventListener("scroll", (event) => {
    if (window.scrollY / window.screenY > 0.13) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const icons = {
    category: <CategoryOutlined fontSize="small" />,
    price: <MonetizationOnOutlined fontSize="small" />,
    date: <EventOutlined fontSize="small" />,
    author: <PersonAddOutlined fontSize="small" />,
  };

  const {
    get,
    post,
    loading: expensesLoading,
    error: expensesError,
    response,
  } = useFetch(`https://webhomebudget.azurewebsites.net/api`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("userToken"),
    },
  });

  const categoryGet = async () => {
    const categories = await get("/category/over");
    if (response.ok) {
      let newCategoriesData = [];
      for (let cat of categories) {
        const subcategories = await get(`/category/sub/${cat.id}`);
        if (response.ok) {
          newCategoriesData.push({ ...cat, subcategories });
        }
      }
      setCategories(newCategoriesData);
    }
  };

  const expenseGet = useCallback(async () => {
    const newExpenses = await get("/budget/expenses");
    if (response.ok) {
      setExpenses(newExpenses);
      setFilteredExpenses(newExpenses);
    }
  }, [response, get, setExpenses]); // dodany callback - moze sie wysypac

  const expensePost = async (formData) => {
    await post("/budget/expenses", formData);
    if (response.ok) expenseGet();
  };

  useEffect(() => {
    expenseGet();
  }, [expenseGet]);

  useEffect(() => {
    categoryGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const expensePut = async (params) => {};
  // const expenseDelete = async (params) => {};

  const onFetchErrorComponent = <div>Data fetching error</div>;
  const onFetchLoadingComponent = <Spinner animation="border" />;
  const onFetchLoadedComponent = (
    <>
      <ExpensesTab title="Today" entries={filteredExpenses} icons={icons} />
      <ExpensesTab title="Yesterday" entries={null} icons={icons} />
      <ExpensesTab title="Earlier" entries={null} icons={icons} />
    </>
  );

  return (
    <>
      <FilterPanel
        categories={categories}
        isScrolled={isScrolled}
        expenses={expenses}
        setFilteredExpenses={setFilteredExpenses}
      />
      <Container className="my-5">
        <ConatinerWithHeader>
          {{
            header: <h4>Add new expense</h4>,
            body: <ExpenseWizard expensePost={expensePost} />,
          }}
        </ConatinerWithHeader>
        <ConatinerWithHeader>
          {expensesError
            ? {
                header: <h4>Error</h4>,
                body: onFetchErrorComponent,
              }
            : expensesLoading
            ? {
                header: <h4>Loading expenses list</h4>,
                body: onFetchLoadingComponent,
              }
            : { header: <h4>Expenses list</h4>, body: onFetchLoadedComponent }}
        </ConatinerWithHeader>
      </Container>
    </>
  );
};

export default ExpensesPage;

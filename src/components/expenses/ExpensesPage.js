import {
  CategoryOutlined,
  EventOutlined,
  MonetizationOnOutlined,
  PersonAddOutlined,
} from "@material-ui/icons";

import React, { useEffect, useState } from "react";

import { Container, Spinner, Button } from "react-bootstrap";

import useFetch from "use-http";

import ConatinerWithHeader from "./ConatinerWithHeader";

import ExpenseWizard from "./expense/ExpenseWizard";
import ExpensesTab from "./expensesTab/ExpensesTab";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isScrolled, setIsScrolled] = useState(false);

  const [getPage, setGetPage] = useState(1);

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
    // put,
    // del,
    loading: expensesLoading,
    error: expensesError,
    response,
  } = useFetch(`https://webhomebudget.azurewebsites.net/api`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("userToken"),
    },
    cachePolicy: "no-cache",
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

  const expenseGet = async () => {
    const newExpenses = await get(`/budget/expenses/page/${getPage}`);
    if (response.ok)
      if (newExpenses.length !== 0) {
        setGetPage(getPage + 1);
        setExpenses([...expenses, ...newExpenses]);
      }
  };

  // const expensePut = async (id, formData) => {
  //   await put()
  // };

  // const expenseDelete = async (id) => {
  //   await del(`/${id}`);
  // };

  const onFetchErrorComponent = <div>Data fetching error</div>;
  const onFetchLoadingComponent = <Spinner animation="border" />;
  const onFetchLoadedComponent = (
    <>
      <Button
        className="my-2"
        onClick={(e) => {
          e.preventDefault();
          expenseGet();
        }}
      >
        GET 5 MORE
      </Button>
      <ExpensesTab
        title="Today"
        expensesData={expenses?.filter((expense) => {
          const expenseDate = new Date(expense?.date).toDateString();
          const yesterdayDate = new Date().toDateString();
          return expenseDate === yesterdayDate;
        })}
        icons={icons}
      />
      <ExpensesTab
        title="Yesterday"
        expensesData={expenses?.filter((expense) => {
          const expenseDate = new Date(expense?.date).toDateString();
          const yesterdayDate = new Date(Date.now() - 86400000).toDateString();
          return expenseDate === yesterdayDate;
        })}
        icons={icons}
      />
      <ExpensesTab title="All" expensesData={expenses} icons={icons} />
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

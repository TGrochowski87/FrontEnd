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
  const icons = {
    category: <CategoryOutlined fontSize="small" />,
    price: <MonetizationOnOutlined fontSize="small" />,
    date: <EventOutlined fontSize="small" />,
    author: <PersonAddOutlined fontSize="small" />,
  };

  const {
    get,
    // post,
    // put,
    // del,
    loading: expensesLoading,
    error: expensesError,
    response,
  } = useFetch(`https://webhomebudget.azurewebsites.net/api/budget/expenses`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("userToken"),
    },
  });

  const expenseGet = useCallback(async () => {
    const newExpenses = await get();
    if (response.ok) setExpenses(newExpenses);
  }, [response, get, setExpenses]); // dodany callback - moze sie wysypac

  const expensePost = async (formData) => {
    for (var p of formData) {
      console.log(p);
    }
    // const newExpenses = await post(formData);
    // if (response.ok) expenseGet();

    const data = {
      date: new Date().toJSON(),
      categoryId: 1,
      price: 1234,
      budgetId: 1,
      userid: 1,
    };

    const fd = new FormData();
    fd.append("data", JSON.stringify(data));
    // for (var p of fd) {
    //   console.log(p);
    // }

    fetch("https://webhomebudget.azurewebsites.net/api/budget/expenses", {
      method: "POST",
      body: fd,
    })
      .then(() => {
        expenseGet();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(sessionStorage.getItem("userToken"));
    expenseGet();
  }, [expenseGet]);

  // const expensePut = async (params) => {};
  // const expenseDelete = async (params) => {};

  const onFetchErrorComponent = <div>Data fetching error</div>;
  const onFetchLoadingComponent = <Spinner animation="border" />;
  const onFetchLoadedComponent = (
    <>
      <ExpensesTab title="Today" entries={expenses} icons={icons} />
      <ExpensesTab title="Yesterday" entries={null} icons={icons} />
      <ExpensesTab title="Earlier" entries={null} icons={icons} />
    </>
  );

  return (
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
  );
};

export default ExpensesPage;

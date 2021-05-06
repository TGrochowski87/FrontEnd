import React, { useState } from 'react';

import { Container } from 'react-bootstrap';

import ExpensesList from './expensesList/ExpensesList';

const ExpensesPage = () => {
<<<<<<< HEAD
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
    const categories = await get("/category/expense/over");
    if (response.ok) {
      let newCategoriesData = [];
      for (let cat of categories) {
        const subcategories = await get(`/category/expense/sub/${cat.id}`);
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
        expensesData={filteredExpenses?.filter((expense) => {
          const expenseDate = new Date(expense?.date).toDateString();
          const yesterdayDate = new Date().toDateString();
          return expenseDate === yesterdayDate;
        })}
        icons={icons}
      />
      <ExpensesTab
        title="Yesterday"
        expensesData={filteredExpenses?.filter((expense) => {
          const expenseDate = new Date(expense?.date).toDateString();
          const yesterdayDate = new Date(Date.now() - 86400000).toDateString();
          return expenseDate === yesterdayDate;
        })}
        icons={icons}
      />
      <ExpensesTab title="All" expensesData={filteredExpenses} icons={icons} />
    </>
  );

=======
>>>>>>> 923026603ac52993809d7f71be88c93c564b7d3d
  return (
    <Container className='my-3'>
      <ExpensesList />
    </Container>
  );
};

export default ExpensesPage;

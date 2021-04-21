import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./components/Login";
import Register from "./components/Register";
import CategoryPage from "./components/categories/CategoryPage";
import useSessionStorageState from "./SessionStorageState";
import HomePage from "./components/HomePage";
import ExpensesPage from './components/expenses/ExpensesPage';
import "./styles/App.scss";

function App() {
  const [nickName, setNickName] = useSessionStorageState('', 'name');

  //Categories
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    const supCategories = await fetch(
      "https://webhomebudget.azurewebsites.net/api/category/base/over"
    ).then((response) => response.json());

    const fetchSubcategories = async () => {
      const newCategoriesData = [];
      for (const sup of supCategories) {
        const subcategories = await fetch(
          `https://webhomebudget.azurewebsites.net/api/category/base/sub/${sup.id}`
        ).then((response) => response.json());
        const dataItem = { ...sup, subcategories };
        newCategoriesData.push(dataItem);
      }

      setCategories(newCategoriesData);
      setIsLoading(false);
    };
    await fetchSubcategories();
  };
  //

  useEffect(() => {
    setIsLoading(true);
    fetchCategories();
  }, []);

  return (
    <div className='App'>
      <NavigationBar nickName={nickName} setNickName={setNickName} />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path='/expenses' component={ExpensesPage} />
          <Route
            path='/login'
            render={(props) => <Login {...props} setNickName={setNickName} />}
          />
          <Route path="/register" component={Register} />
          <Route
            path="/categories"
            render={(props) => (
              <CategoryPage
                {...props}
                categories={categories}
                fetchCategories={fetchCategories}
                isLoading={isLoading}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

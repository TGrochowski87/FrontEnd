import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import useSessionStorageState from "./SessionStorageState";

import NavigationBar from "./components/utils/NavigationBar";
import "./styles/App.scss";
import CategoryPage from "./components/categories/CategoryPage";
import ExpensesPage from "./components/expenses/ExpensesPage";
import HomePage from "./components/home/HomePage";
import IncomesPage from "./components/incomes/IncomesPage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import LogoutInfoModal from "./components/utils/LogoutInfoModal";
import ExpensePlanningPage from "./components/planning/expenses/ExpensePlanningPage";
import IncomePlanningPage from "./components/planning/incomes/IncomePlanningPage";

import TestPage from "./components/utils/TestPage";

function App() {
  const [logoutShow, setLogoutShow] = useState(false);

  const [userName, setUserName] = useSessionStorageState("", "userName");

  const logout = () => {
    console.log("w funkcji");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userToken");
    setUserName("");

    setLogoutShow(true);
  };

  return (
    <div className="app">
      <Router>
        <LogoutInfoModal
          logoutShow={logoutShow}
          setLogoutShow={setLogoutShow}
        />
        <NavigationBar userName={userName} setUserName={setUserName} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <HomePage {...props} userName={userName} />}
          />
          <Route path="/test" component={TestPage} />
          <Route
            path="/incomes"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <IncomesPage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/expenses"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <ExpensesPage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} setUserName={setUserName} logout={logout} />
            )}
          />
          <Route path="/register" component={Register} />
          <Route
            path="/categories"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <CategoryPage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/planning/expense"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <ExpensePlanningPage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/planning/income"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <IncomePlanningPage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

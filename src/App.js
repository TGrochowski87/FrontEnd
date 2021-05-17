import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import CategoryPage from "./components/categories/CategoryPage";
import useSessionStorageState from "./SessionStorageState";
import HomePage from "./components/HomePage";
import ExpensesPage from "./components/expenses/ExpensesPage";
import ExpensePlanningPage from "./components/planning/expenses/ExpensePlanningPage";
import IncomePlanningPage from "./components/planning/incomes/IncomePlanningPage";
import LogoutInfoModal from "./components/utils/LogoutInfoModal";

import "./styles/App.scss";

function App() {
  const [userName, setUserName] = useSessionStorageState("", "userName");

  const [logoutShow, setLogoutShow] = useState(false);

  return (
    <div className="App">
      <Router>
        <LogoutInfoModal
          logoutShow={logoutShow}
          setLogoutShow={setLogoutShow}
        />
        <NavigationBar userName={userName} setUserName={setUserName} />
        <Switch>
          <Route exact path="/" component={HomePage} />
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
              <Login
                {...props}
                setUserName={setUserName}
                setLogoutShow={setLogoutShow}
              />
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

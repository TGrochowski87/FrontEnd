import React from "react";
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
import PlanningPage from "./components/planning/PlanningPage";
import "./styles/App.scss";

function App() {
  const [userName, setUserName] = useSessionStorageState("", "userName");

  return (
    <div className="App">
      <Router>
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
            render={(props) => <Login {...props} setUserName={setUserName} />}
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
            path="/planning"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <PlanningPage {...props} />
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

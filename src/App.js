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
import "./styles/App.scss";

function App() {
  const [userName, setUserName] = useSessionStorageState("", "userName");

  return (
    <div className="App">
      {/* <button
        onClick={() => {
          console.log(sessionStorage.getItem("isAuthenticated"));
        }}
      >
        isAuthenticated
      </button>
      <button
        onClick={() => {
          console.log(sessionStorage.getItem("userToken"));
        }}
      >
        token
      </button>
      <button
        onClick={() => {
          console.log(sessionStorage.getItem("userName"));
        }}
      >
        user name
      </button>
      <button
        onClick={() => {
          console.log(userName);
        }}
      >
        name from hook
      </button> */}
      <NavigationBar userName={userName} setUserName={setUserName} />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
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
            exact
            path="/categories"
            render={(props) =>
              sessionStorage.getItem("isAuthenticated") ? (
                <CategoryPage {...props} />
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

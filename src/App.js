import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import BudgetPage from "./components/BudgetPage";
import Login from "./components/Login";
import Register from "./components/Register";
import CategoryPage from "./components/categories/CategoryPage";
import ExpenseDetails from "./components/ExpenseDetails";
import useSessionStorageState from "./SessionStorageState";
import "./styles/App.scss";

function App() {
  const [nickName, setNickName] = useSessionStorageState("", "name");

  return (
    <div className="App">
      <NavigationBar nickName={nickName} setNickName={setNickName} />
      <Router>
        <Switch>
          <Route exact path="/" component={BudgetPage} />
          <Route
            path="/login"
            render={(props) => <Login {...props} setNickName={setNickName} />}
          />
          <Route path="/expenses/:id" component={ExpenseDetails} />
          <Route path="/register" component={Register} />
          <Route path="/categories" component={CategoryPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

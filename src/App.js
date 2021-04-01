import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Jumbotron from "./components/Jumbotron";
import NavigationBar from "./components/NavigationBar";
import BudgetTable from "./components/BudgetTable";
import Login from "./components/Login";
import ExpenseDetails from "./components/ExpenseDetails";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Jumbotron />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={BudgetTable} />
            <Route path="/login" component={Login} />
            <Route path="/expenses/:id" component={ExpenseDetails} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;

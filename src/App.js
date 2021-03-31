import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Jumbotron from "./components/Jumbotron";
import NavigationBar from "./components/NavigationBar";
import BudgetTable from "./components/BudgetTable";
import Login from "./components/Login";
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
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;

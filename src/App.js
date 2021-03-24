import React from "react";
import Layout from "./components/Layout";
import Jumbotron from "./components/Jumbotron";
import BudgetTable from "./components/BudgetTable";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <Jumbotron />
      <Layout>
        <BudgetTable />
      </Layout>
    </div>
  );
}

export default App;

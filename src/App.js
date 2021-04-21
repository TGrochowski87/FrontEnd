import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import useSessionStorageState from './SessionStorageState';

import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import Register from './components/Register';
import './styles/App.scss';
import CategoryPage from './components/categories/CategoryPage';
import ExpensesPage from './components/expenses/ExpensesPage';

function App() {
  const [nickName, setNickName] = useSessionStorageState('', 'name');

  return (
    <div className='App'>
      <NavigationBar nickName={nickName} setNickName={setNickName} />
      <Router>
        <Switch>
          <Route exact path='/' component={ExpensesPage} />
          <Route
            path='/login'
            render={(props) => <Login {...props} setNickName={setNickName} />}
          />
          <Route path='/register' component={Register} />
          <Route path='/categories' component={CategoryPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

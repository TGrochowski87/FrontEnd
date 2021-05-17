import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import useSessionStorageState from './SessionStorageState';

import NavigationBar from './components/NavigationBar';
import './styles/App.scss';
import CategoryPage from './components/categories/CategoryPage';
import ExpensesPage from './components/expenses/ExpensesPage';
import HomePage from './components/home/HomePage';
import IncomesPage from './components/incomes/IncomesPage';
import Login from './components/login/Login';
import Register from './components/login/Register';
import PlanningPage from './components/planning/PlanningPage';
import LogoutInfoModal from './components/utils/LogoutInfoModal';

function App() {
  const [logoutShow, setLogoutShow] = useState(false);

  const [userName, setUserName] = useSessionStorageState('', 'userName');

  return (
    <div className='app'>
      <Router>
        <LogoutInfoModal
          logoutShow={logoutShow}
          setLogoutShow={setLogoutShow}
        />
        <NavigationBar userName={userName} setUserName={setUserName} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route
            path='/incomes'
            render={(props) =>
              sessionStorage.getItem('isAuthenticated') ? (
                <IncomesPage {...props} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            path='/expenses'
            render={(props) =>
              sessionStorage.getItem('isAuthenticated') ? (
                <ExpensesPage {...props} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            path='/login'
            render={(props) => (
              <Login
                {...props}
                setUserName={setUserName}
                setLogoutShow={setLogoutShow}
              />
            )}
          />
          <Route path='/register' component={Register} />
          <Route
            path='/categories'
            render={(props) =>
              sessionStorage.getItem('isAuthenticated') ? (
                <CategoryPage {...props} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            path='/planning'
            render={(props) =>
              sessionStorage.getItem('isAuthenticated') ? (
                <PlanningPage {...props} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

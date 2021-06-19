import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";

// import './App.css';

import SideBar from "./components/sideBar/SideBar";
import Login from "./pages/login/LoginForm";
import Storehouse from "./pages/storehouse/Storehouse";
import Cashier from "./pages/cashier/Cashier";
import Dashboard from "./pages/admin_dashboard/Dashboard";

import PrivateRoute from "./PrivateRoute";
import DataProviderProducts from "./api/products";
const history = createBrowserHistory();

function App() {
  return (
    <>
      <DataProviderProducts>
        <Router basename={process.env.PUBLIC_URL} history={history}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact component={Login}></Route>
            <>
              <SideBar />
              <PrivateRoute path="/storehouse" exact component={Storehouse} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/cashier" exact component={Cashier} />
            </>
            <Route component={Login}></Route>
          </Switch>
        </Router>
      </DataProviderProducts>
    </>
  );
}

export default App;

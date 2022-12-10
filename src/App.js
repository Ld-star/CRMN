import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Search from "./components/Search";
import login from "./components/LoginScreen";
import searchResults from "./components/SearchResults";
import Account from "./components/AccountDetails";
import MainLayoutRoute from "./components/layout/MainLayout";
import ErrorPage from "./components/ErrorPage";
import preval from "preval.macro";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Settings from "./components/Settings";
import Firmware from "./components/Firmware/firmwareSettings";
import Reports from "./components/Reports/reports";
import Orders from "./components/Orders/orders";
import Order from "./components/Orders/order";

class App extends Component {
  render() {
    console.log(
      `Build Date: ${preval`module.exports = new Date().toLocaleString();`}.`
    );
    return (
      <Router>
        <div className="App">
          <Switch>
            <Redirect exact path="/" to="/login" />
            <Route exact path="/login" component={login} />
            <MainLayoutRoute exact path="/search" component={Search} />
            <MainLayoutRoute exact path="/firmware" component={Firmware} />
            <MainLayoutRoute exact path="/reports" component={Reports} />
            <MainLayoutRoute exact path="/orders" component={Orders} />
            <MainLayoutRoute exact path="/order/:id" component={Order} />
            <MainLayoutRoute
              exact
              path="/searchResults"
              component={searchResults}
            />
            <MainLayoutRoute exact path="/hub/:id" component={Account} />
            <MainLayoutRoute exact path="/profile" component={Profile} />
            <MainLayoutRoute
              exact
              path="/edit-profile"
              component={EditProfile}
            />
            <MainLayoutRoute exact path="/settings" component={Settings} />
            <Route path="*" exact={true} component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

const LoggedInRoute = () => {
  <>
    <Route exact path="/" component={Feed} />
  </>;
};

const LoggedOutRoute = () => {
  <>
    <Route exact path="/" component={Auth} />
  </>;
};

const AppRouter = ({ isLoggedIn = true }) => (
  <Router>
    <Switch>{isLoggedIn ? <LoggedInRoute /> : <LoggedOutRoute />}</Switch>
  </Router>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;

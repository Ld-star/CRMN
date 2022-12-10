import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";
import Navbar from "../Navbar";
import { useDispatch } from "react-redux";
import { clearStore } from "../../redux/actions/main";

/* 
The function of MainLayout component is to add the Navbar in the required pages.
The MainLayout function is getting the required page component and the remaining props and then renders the page based on the layout.

By using the layout components we can make pages with different layout structures like dashboard layout, simple layout, blank layout etc.
*/

const MainLayoutRoute = ({ path, component: Component, render, ...rest }) => {
  const dispatch = useDispatch();

  const clear = () => {
    dispatch(clearStore());
  };

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!auth.BasicAuth())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? (
          <Fragment>
            <Navbar clearStore={clear} />
            <Component {...props} />
          </Fragment>
        ) : (
          render(props)
        );
      }}
    />
  );
};

export default MainLayoutRoute;

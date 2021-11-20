import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { shopRoutes } from "../router/router";

function ShopRouter() {
  return (
    <Switch>
      {shopRoutes.map((route) => (
        <Route
          path={route.path}
          component={route.component}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Redirect to="Shop" />
    </Switch>
  );
}

export default ShopRouter;

import React from "react";
import { Route,Redirect} from "react-router";
import Loadable from "react-loadable";
import Loading from "../ui-molecules/Loading";

const UserHome = Loadable({
  loader: () => import("../ui-pages/UserHome"),
  loading: Loading
});

const Login = Loadable({
  loader: () => import("../ui-pages/Login"),
  loading: Loading
});

const OTP = Loadable({
  loader: () => import("../ui-pages/OTP"),
  loading: Loading
});

const MainRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/user-home" component={UserHome} />
      <Route path="/Otp" component={OTP} />
      <Redirect to="/" />
    </div>
  )
}

export default MainRoutes;

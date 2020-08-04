import React from "react";
import { Route } from "react-router";
import Loadable from "react-loadable";
import Loading from "../ui-molecules/Loading";

const Landing = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/Landing"),
  loading: Loading,
});
const HomeScreen = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/HomeScreen"),
  loading: Loading,
});
const ChatScreen = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/ChatScreen"),
  loading: Loading,
});
const Calendar = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/Calendar"),
  loading: Loading,
});
const Specialists = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/Specialists"),
  loading: Loading,
});
const Symptoms = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/Symptoms"),
  loading: Loading,
});

const UserRoutes = () => {
  return (
    <div>
      <Route exact path="/user-home" component={Landing} />
      <Route  path="/user-home/user-screen" component={HomeScreen} />
      <Route  path="/user-home/user-screen/chat" component={ChatScreen} />
      <Route  path="/user-home/user-screen/calendar" component={Calendar} />
      <Route  path="/user-home/user-screen/calendar/specialists" component={Specialists} />
      <Route  path="/user-home/user-screen/calendar/symptoms" component={Symptoms} />
    </div>
  );
};

export default UserRoutes;

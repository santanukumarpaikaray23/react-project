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
const BookAppointment = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/BookAppointment"),
  loading: Loading,
});
const ConfirmBooking = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/ConfirmBooking"),
  loading: Loading,
});
const Chat = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/Chat"),
  loading: Loading,
});
const VideoCall = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/VideoCall/Video"),
  loading: Loading,
});
const GenerateToken = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/GenerateToken"),
  loading: Loading,
});
const TodayAppointments = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/TodayAppointments"),
  loading: Loading,
});
const FutureAppointments = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/FutureAppointments"),
  loading: Loading,
});
const PaymentGateway = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/PaymentGateway"),
  loading: Loading,
});
const PaymentSuccessful = Loadable({
  loader: () =>
    import("../ui-pages/UserHome/components/Content/PaymentSuccessful"),
  loading: Loading,
});

const UserRoutes = () => {
  return (
    <div>
      <Route exact path="/user-home" component={Landing}/>
      <Route  path="/user-home/home" component={HomeScreen}/>
      <Route  path="/user-home/chat" component={ChatScreen}/>
      <Route  path="/user-home/chating" component={Chat}/>
      <Route  path="/user-home/book-appointment" component={BookAppointment}/>
      <Route  path="/user-home/calendar" component={Calendar}/>
      <Route  path="/user-home/calendar/today-appointments" component={TodayAppointments}/>
      <Route  path="/user-home/calendar/future-appointments" component={FutureAppointments}/>
      <Route  path="/user-home/home/specialists" component={Specialists}/>
      <Route  path="/user-home/home/symptoms" component={Symptoms}/>
      <Route  path="/user-home/confirm-booking" component={ConfirmBooking}/>
      <Route  path="/user-home/video-call" component={VideoCall}/>
      <Route  path="/user-home/generate-token" component={GenerateToken}/>
      <Route  path="/user-home/payment-gateway" component={PaymentGateway}/>
      <Route  path="/user-home/payment-successful" component={PaymentSuccessful}/>
    </div>
  );
};

export default UserRoutes;

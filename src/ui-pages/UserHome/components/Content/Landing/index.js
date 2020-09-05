import React from "react";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api"
import { connect } from "react-redux";


class Landing extends React.Component {
  componentDidMount = async () => {
    debugger
    const { setAppData } = this.props;
    let tempVar = []
    let days = [{ number: 1, day: "Mon" }, { number: 2, day: "Tue" }, { number: 3, day: "Wed" }, { number: 4, day: "Thru" }, { number: 5, day: "Fri" },
    { number: 6, day: "Sat" }, { number: 7, day: "Sun" }]
    let dat = {}
    const apiResponse = await httpRequest({
      endPoint: `/patientAppointmentList/7895328523`,
      method: "get",
      instance: "instanceOne",
    })
    if (apiResponse) {
      apiResponse.forEach((data) => {
        let datee = data.appointment_datetime
        let da = new Date(datee).getDate()
        let daa = new Date(datee).getDay()
        if (data.appointment_datetime === new Date().getDate()) {
          days.forEach((dataa) => {
            if (dataa.number === daa) {
              dat = { ...data, date: da, day: dataa.day, actualDate: data.booking_date }
              tempVar.push(dat)
            }
          })
          setAppData("landing.todayAppointment", tempVar)
        }
        if (data.appointment_datetime !== new Date().getDate()) {
          days.forEach((dataa) => {
            if (dataa.number === daa) {
              dat = { ...data, date: da, day: dataa.day, actualDate: data.booking_date }
              tempVar.push(dat)
            }
          })
          setAppData("futureAppointments.appointments", tempVar)
        }
      })
    }
  }

  render() {
    const { history, todayAppointment } = this.props
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
        {todayAppointment ?
          <Card>
            <Grid
              container
              style={{ background: "#343434", color: "white", padding: "10px", marginTop: "10px" }}>
              <Typography onClick={() => history.push("/user-home/generate-token")}>You don't have any upcomming appointment</Typography>
              <MessageIcon style={{ marginLeft: "4%", marginTop: "1%" }} onClick={() => history.push("/user-home/video-call")} />
            </Grid>
          </Card> : ""}
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          style={{ height: "10vh", marginTop: "40px" }}
        >
          <Typography variant="h6"> Hello Tony S. Ringing,</Typography>
          {"\n"}
          <Typography >What would you like to do today?</Typography>
        </Grid>
        <Card style={{ margin: "15px" }} >
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={4} >
                <img width="90%" height="100%" src='ic_video_on.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={8} onClick={() => history.push("/user-home/home")}>
                <Typography variant="h6"> Video call a Doctor</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  You can book a video confrence and meet our doctors sitting at
                  comfort in your home
                  </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={4}>
                <img width="90%" height="100%" src='ic_clinic_o.svg' alt="verify_icon" />

              </Grid>
              <Grid item md={8}>
                <Typography variant="h6"> Clinic Appointment</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  You can book a video confrence and meet our doctors sitting at
                  comfort in your home
                  </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={4}>
                <img width="90%" height="100%" src='ic_home_clinic_f.svg' alt="verify_icon" />

              </Grid>
              <Grid item md={8}>
                <Typography variant="h6"> Doctor at Home</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  You can book a video confrence and meet our doctors sitting at comfort in your home
                 </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}
// export default withRouter(Landing) ;
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { login = {}, landing = {} } = preparedFinalObject;
  const { todayAppointment } = landing
  const { phoneno } = login
  return { phoneno, landing, todayAppointment }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)
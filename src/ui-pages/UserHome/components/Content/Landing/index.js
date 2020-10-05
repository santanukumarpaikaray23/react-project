import React from "react";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api"
import { connect } from "react-redux";


class Landing extends React.Component {
  componentDidMount = async () => {
    
    const { setAppData, phoneno } = this.props;
    let tempVar = []
    let tempVar1 = []
    let days = [{ number: 1, day: "Mon" }, { number: 2, day: "Tue" }, { number: 3, day: "Wed" }, { number: 4, day: "Thru" }, { number: 5, day: "Fri" },
    { number: 6, day: "Sat" }, { number: 7, day: "Sun" }]
    let dat = {}
    const apiResponse = await httpRequest({
      endPoint: `/patientAppointmentList/${phoneno}`,
      method: "get",
      instance: "instanceOne",
    })
    if (apiResponse) {
      apiResponse.forEach((data) => {
        let datee = data.appointment_datetime
        let da = new Date(datee).getDate()
        let daa = new Date(datee).getDay()
        if (data.date_status === true) {
          days.forEach((dataa) => {
            if (dataa.number === daa) {
              dat = { ...data, date: da, day: dataa.day, actualDate: data.booking_date }
              tempVar.push(dat)
            }
          })
          setAppData("landing.todayAppointment", tempVar)
        }
        if (data.date_status !== true) {
          days.forEach((dataa) => {
            if (dataa.number === daa) {
              dat = { ...data, date: da, day: dataa.day, actualDate: data.booking_date }
              tempVar1.push(dat)
            }
          })
          setAppData("futureAppointments.appointments", tempVar1)
        }
      })
    }
    this.checkLatestAppointemnt(tempVar);
  }

  checkLatestAppointemnt = (tempVar) => {
    
    const { setAppData, todayAppointment,morningSlots,afternoonSlots} = this.props
    let a = []
    let b = []
    tempVar && tempVar.forEach((data) => {
      if (data.slot_time !== null) {
        let hrs = new Date(data.current_time).getHours();
        let tmnts = new Date(data.current_time).getMinutes() //=== 0 ? 00 : new Date(data.current_time).getMinutes();
        let fmnts;
        if(tmnts === 0){
          tmnts = "00"
        }
        if(data.slot_time > hrs+":"+tmnts){
          console.log(data.slot_time);
        setAppData("landing.latestAppointment",data)
        }else{
          // console.log(data.slot_time);
          // setAppData("landing.latestAppointment","No Appointment")
        }
      // if (data.slot_time === "9:00") {
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "9:30"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "10:00"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "10:30"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "11:00"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "11:30"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "12:00"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "12:30"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "1:00"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "1:30"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "2:00"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "2:30"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "3:00"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "3:30"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "4:00"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "4:30"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "5:00"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }else if(data.slot_time === "5:30"){
      //   console.log(data.slot_time);
      //   setAppData("landing.latestAppointment",data)
      // }
     }else{
      console.log("data.slot_time");
      setAppData("landing.latestAppointment",'')
     }
    })
  }

  render() {
    const { history, setAppData, landing } = this.props
    //console.log(landing.latestAppointment);
    let latestAppointment = landing.latestAppointment;

//     let time;
// if(latestAppointment !== undefined && latestAppointment != ''){
//     let mnts = new Date(latestAppointment.appointment_datetime).getMinutes();
//     let hrs = new Date(latestAppointment.appointment_datetime).getHours();
//     if(hrs>12){
//       time = hrs-12+":"+mnts+" PM"
//     }else{
//       time = hrs+":"+mnts+" AM"
//     }
//   }
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
        {latestAppointment ?
          <Card>
            <Grid
              container
              style={{ background: "#343434", color: "white", padding: "10px", marginTop: "10px" }}>
              <Typography onClick={() => {setAppData("generateToken.appointment",latestAppointment);
                     history.push("/user-home/generate-token")}}>You are having upcomming appointment on {latestAppointment.date} {latestAppointment.day}
               {""} {latestAppointment.slot_time} with doctor {latestAppointment.doctor_name}</Typography>
              {/* <MessageIcon style={{ marginLeft: "4%", marginTop: "1%" }} onClick={() => history.push("/user-home/video-call")} /> */}
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
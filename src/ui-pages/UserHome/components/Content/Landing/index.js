import React from "react";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import { mapDispatchToProps,getTime,getDateandDay } from "../../../../../ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api"
import { connect } from "react-redux";


class Landing extends React.Component {
  componentDidMount = async () => {
    const { setAppData, phoneno } = this.props;
    let tempVar = []
    let tempVar1 = []
    let days = [{ number: 1, day: "Mon" }, { number: 2, day: "Tue" }, { number: 3, day: "Wed" }, { number: 4, day: "Thu" }, { number: 5, day: "Fri" },
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
    let finalAppointment = []
    tempVar && tempVar.forEach((data) => {
      if (data.slot_time !== null) {
        let hrs = new Date(data.current_time).getHours();
        let tmnts = new Date(data.current_time).getMinutes() //=== 0 ? 00 : new Date(data.current_time).getMinutes();
        let fmnts;
        if(tmnts === 0){
          tmnts = "00"
        }
        if(data.appointment_datetime > data.current_time){// hrs.toString()+":"+tmnts.toString()){
          console.log(data.slot_time);
          a.push(data);
        //setAppData("landing.latestAppointment",data)
        }
     }else{
      console.log("data.slot_time");
      setAppData("landing.latestAppointment",'')
     }
    })
    //this.getFinalAppointment(a)
    finalAppointment = a.sort(function (a, b) {
      var key1 = new Date(a.actualDate);
      var key2 = new Date(b.actualDate);
  
      if (key1 < key2) {
          return -1;
      } else if (key1 == key2) {
          return 0;
      } else {
          return 1;
      }
    });
    setAppData("landing.todaylatest",finalAppointment)
    setAppData("landing.latestAppointment",finalAppointment[0])
  }

  // getFinalAppointment = (finalData) =>{

  // }

  render() {
    const { history, setAppData, landing, otpresponse } = this.props
    let latestAppointment = landing.latestAppointment;
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
        {latestAppointment ?
          <Card>
            <Grid
              container
              style={{ background: "#343434", color: "white", padding: "10px", marginTop: "10px" }}>
              <Typography onClick={() => {setAppData("generateToken.appointment",latestAppointment);
                     history.push("/user-home/generate-token")}}>Upcoming appointment{' '}{getDateandDay(latestAppointment.appointment_datetime)}
               {""} {getTime(latestAppointment.appointment_datetime)}{" "}for video consultaion with Dr.{' '}{latestAppointment.doctor_name}
               </Typography>
              {/* <MessageIcon style={{ marginLeft: "4%", marginTop: "1%" }} onClick={() => history.push("/user-home/video-call")} /> */}
            </Grid>
          </Card> : <Card>
            <Grid
              container
              style={{ background: "#343434", color: "white", padding: "10px", marginTop: "10px" }}>
              <Typography>
                You don't have appointment
               </Typography>
            </Grid>
          </Card>}
          {otpresponse && otpresponse.privilege_type == 2 ? 
          <span>
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
              <Grid item xs={2} md={4} >
                <img width="90%" height="100%" src='ic_video_on.svg' alt="verify_icon" />
              </Grid>
              <Grid item xs={10} md={8} onClick={() => history.push("/user-home/home")}>
                <Typography variant="h6">Consult on Video</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                Book a video consultation and consult online using chat, call, or video with doctors from the comfort of your home
                  </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={2} md={4}>
                <img width="90%" height="100%" src='ic_clinic_o.svg' alt="verify_icon" />

              </Grid>
              <Grid item xs={10} md={8}>
                <Typography variant="h6"> Clinic Appointment</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                Book an appointment to consult at your chosen doctor’s clinic
                  </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </span>
        :
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={2} md={4}>
                <img width="90%" height="100%" src='ic_home_clinic_f.svg' alt="verify_icon" />
          
              </Grid>
              <Grid item xs={10} md={8}>
                <Typography variant="h6"> Doctor at Home</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  You can book a video confrence and meet our doctors sitting at comfort in your home
                 </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
  }
      </div>
    );
  }
}
// export default withRouter(Landing) ;
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { login = {}, landing = {}, otp={} } = preparedFinalObject;
  const { todayAppointment, todaylatest } = landing
  const { otpresponse } = otp
  const { phoneno } = login
  return { phoneno, landing, todayAppointment, otp, todaylatest, otpresponse }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)
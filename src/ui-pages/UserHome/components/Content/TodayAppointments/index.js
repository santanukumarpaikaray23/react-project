import React from "react";
import { Card, Grid, CardContent, Typography, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
class TodayAppointments extends React.Component {
  render() {
    
    const { history, todayAppointment,setAppData } = this.props
    return (
      <div style={{ background: "#f7f7f7", height: "100vh" }}>
        <div style={{ margin: "0px 15px 15px 15px" }}>
          {todayAppointment.map((data) => {
    console.log("asdfghjkl"+new Date(data.appointment_datetime).getHours());
            return (
              <div>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  direction="row"
                  style={{ height: "13vh", marginTop: "3.5%" }}>
                  <Typography align="center" color="textSecondary" style={{
                    margin: "5px 5px 2px 5px",
                    fontSize: "15px", fontWeight: 500
                  }}>Your next appontment is on {monthNames[new Date(data.appointment_datetime).getMonth()]} {""}
                {data.date},{data.day}
                {""} at {new Date(data.appointment_datetime).getHours()>12?new Date(data.appointment_datetime).getHours()-12+":" : new Date(data.appointment_datetime).getHours()+":" }{+new Date(data.appointment_datetime).getMinutes()=== 0?"00":+new Date(data.appointment_datetime).getMinutes()}{""} {new Date(data.appointment_datetime).getHours() === 9 || new Date(data.appointment_datetime).getHours() === 10 || new Date(data.appointment_datetime).getHours() === 11 ? "AM":"PM"} with {data.doctor_name}</Typography>
                    
                  {"\n"}
                </Grid>
                <Card>
                  <CardContent>
                    <Grid style={{ display: "flex" }} onClick={() =>{setAppData("generateToken.appointment",data);
                     history.push("/user-home/generate-token")}}>
                      <Grid item xs={3}>
                        <Avatar />
                      </Grid>
                      <Grid item md={9}>
                        <Typography variant="h6">{data.doctor_name}</Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                          {data.Doctor_speciality}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { landing = {} } = preparedFinalObject;
  const { todayAppointment = [] } = landing

  return { todayAppointment,landing }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodayAppointments)
import React from "react";
import { Card, Grid, CardContent, Typography, Avatar, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { mapDispatchToProps, getTime, getDateandDay } from "../../../../../ui-utils/commons";

class GenerateToken extends React.Component {
  
  render() {
    const { history,appointment } = this.props
    return (
      <div style={{ background: "#f7f7f7", height: "100vh" }}>
        <div style={{ margin: "0px 15px 15px 15px" }}>
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
                  }}>{appointment.date_status ? 'Your next appontment is ':'Your next appontment is on'}
                  {""}{getDateandDay(appointment.appointment_datetime)}
                  {""} {getTime(appointment.appointment_datetime)} with Dr. {appointment.doctor_name}</Typography>

                  {/* <Typography align="center" color="textSecondary" style={{
                    margin: "5px 5px 2px 5px",
                    fontSize: "15px", fontWeight: 500
                  }}>
                    Your Appontment is today, September {appointment.date} {appointment.day}
                    {""} at {appointment.slot_time} AM with {appointment.doctor_name}
                    </Typography> */}
                  {"\n"}
                </Grid>
                <Card >
                  <CardContent>
                    <Grid style={{ display: "flex" }}>
                      <Grid item xs={3}>
                        <Avatar />
                      </Grid>
                      <Grid item md={9}>
                <Typography variant="h6">
                  {appointment.doctor_name}
                  </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                          {appointment.Doctor_speciality}
                </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                {appointment.date_status ?<div>
                <Grid container alignItems="center"
                  justify="center"
                  direction="row" style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
                  <Typography variant="h6" align="center"
                    style={{ fontSize: "15px", fontWeight: 1200 }}>Click below to confirm your appointment and earn credits</Typography>
                </Grid>
                  
                <Button
                  size="large"
                  variant="contained"
                  style={{
                    background: "#2FC9B9",
                    borderRadius: "20px",
                    width: "257px",
                    color: "white",
                    marginLeft: "10%"
                  }}
                >
                  <Typography align="center" variant="h6" onClick={()=>{//setAppData("doctorvidcall",appointment);
                             history.push("/user-home/video-call")}}>Confirmation Token</Typography>
                </Button></div>
                : ''}
              </div>
            {/* )
          })} */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { generateToken = {}, landing = {} } = preparedFinalObject;
  const { todayAppointment } = landing
  const { appointment } = generateToken
  return { landing, todayAppointment,generateToken,appointment }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateToken)
import React from "react";
import { Card, Grid, CardContent, Typography, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";

class TodayAppointments extends React.Component {
  render() {
    debugger
    const { history, todayAppointment,setAppData } = this.props
    return (
      <div style={{ background: "#f7f7f7", height: "100vh" }}>
        <div style={{ margin: "0px 15px 15px 15px" }}>
          {todayAppointment.map((data) => {
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
                  }}>Your next appontment is on September {""}
                {data.date},{data.day}
                    {""} at {data.slot_time} AM with {data.doctor_name}</Typography>
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
import React from "react";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import HomeIcon from "@material-ui/icons/Home";
import MessageIcon from "@material-ui/icons/Message";
class Landing extends React.Component {
  render() {
    const { history } = this.props
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
        <Card>
          <Grid
            container
            style={{ background: "#343434", color: "white", padding: "10px", marginTop: "10px" }}
            onClick={() => history.push("/user-home/user-screen")}
          >
            <Typography>You don't have any upcomming appointment</Typography>
            <MessageIcon style={{ marginLeft: "4%", marginTop: "1%" }} />
          </Grid>
        </Card>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          style={{ height: "10vh" }}
        >
          <Typography variant="h6"> Hello Tony S. Ringing,</Typography>
          {"\n"}
          <Typography >What would you like to do today?</Typography>
        </Grid>
        <Card style={{ margin: "15px" }} >
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={4} >
                <VideocamIcon style={{ color: "#696969",fontSize:"400%",marginTop:"12%"}}/>
              </Grid>
              <Grid item md={8}>
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
                <LocalHospitalIcon style={{ color: "#696969",fontSize:"400%",marginTop:"12%"}} />
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
                <HomeIcon style={{ color: "#696969",fontSize:"400%",marginTop:"12%"}} />
              </Grid>
              <Grid item md={8}>
                <Typography variant="h6"> Doctor at Home</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                You can book a video confrence and meet our doctors sitting at
                  comfort in your home
                 </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default Landing;
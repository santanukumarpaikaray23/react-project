import React from "react";
import { Card, Grid, CardContent, Typography, Avatar } from "@material-ui/core";
class ChatScreen extends React.Component {
  render() {
    const { history } = this.props
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          style={{ height: "8vh", marginTop: "3.5%" }}
        >
          <Typography variant="h6" color="textSecondary">whome do you want to chat with?</Typography>
          {"\n"}
        </Grid>
        <Card style={{ margin: "0px 15px 15px 15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
                <Avatar />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6" > Michael D.Dombroski</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  General Physician 11 years, MBBS, MD, English and Freanch
                </Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary" variant="subtitle2">Answers on chat between 12:30 PM to 5:30 PM.</Typography>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
                <Avatar />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6"> Patrica</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  Gyeanocologist, 11 years, MBBS, MD, English and Italy
               </Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary" variant="subtitle2">Answers on chat between 12:30 PM to 5:30 PM.</Typography>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
                <Avatar />
              </Grid>
              <Grid item md={8}>
                <Typography variant="h6"> Helen</Typography>
                <Typography color="textSecondary" variant="subtitle2" >
                  General Physician 11 years, MBBS, MD, English and Freanch
               </Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary" variant="subtitle2">Answers on chat between 12:30 PM to 5:30 PM.</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default ChatScreen;
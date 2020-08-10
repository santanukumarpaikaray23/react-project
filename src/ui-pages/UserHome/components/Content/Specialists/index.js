import React from "react";
import { Card, Grid, CardContent, Typography, Avatar } from "@material-ui/core";

class Specialists extends React.Component {
  render() {
    const { history } = this.props
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          style={{ height: "10vh" }}>
          <Typography variant="h6" color="textSecondary">Find your doctor by specialists</Typography>
          {"\n"}
        </Grid>
        <Card style={{ margin: "0px 15px 15px 15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_physician_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6"> General Physician</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
               </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_pediatrician_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6"> Pediatrician </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_psychiatrist_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6">Phychiatrist</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_gynaecologist_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6">Gynaecologist</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_dermatologist_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6">Dermatologist</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}
export default Specialists;
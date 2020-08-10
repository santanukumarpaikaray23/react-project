import React from "react";
import { Card, Grid, CardContent, Typography, Avatar, TextField } from "@material-ui/core";

class Symptoms extends React.Component {
  render() {
    const { history } = this.props
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
        // style={{ height: "5vh" }}
        >
          <Typography variant="h6" color="textSecondary" style={{ marginTop: "20px" }}>
            Find your doctor by symptoms</Typography>
          {"\n"}
        </Grid>
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0, fontWeight: "bold" } }} />
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" style={{ fontWeight: "bold" }}>PAIN/HURT</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0 } }} />
          </Grid>
          <Grid container align="center"  >
            <Grid item xs={3} style={{ padding: "10px" }}>
              <img height ="20px" width="20px" src="order-placed.png" style={{ position: "absolute" }}></img>
              <Avatar style={{ height: "45px", width: "45px",position: "relative"  }} src="ic_eight.svg"></Avatar>
              <Typography>ABDOMEN</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar style={{ height: "45px", width: "45px" }} src="ic_eight.svg" ></Avatar>
              <Typography>BACK</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar style={{ height: "45px", width: "45px" }}  src="ic_three.svg" ></Avatar>
              <Typography>CHEST</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar style={{ height: "45px", width: "45px" }} src="ic_add_square_o.svg"></Avatar>
              <Typography>EAR</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar style={{ height: "45px", width: "45px" }} src="ic_add_square_o.svg"></Avatar>
              <Typography>HEAD</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar style={{ height: "45px", width: "45px" }} src="ic_eleven.svg"></Avatar>
              <Typography>PILES</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar style={{ height: "45px", width: "45px" }} src="ic_add_square_o.svg"></Avatar>
              <Typography>TOOTH</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0 } }} />
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" style={{ fontWeight: "bold" }}>I FEEL</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0 } }} />
          </Grid>
          <Grid container align="center"  >
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar src="ic_add_square_o.svg" style={{ height: "45px", width: "45px" }} ></Avatar>
              <Typography>CHILLS</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar src="ic_add_square_o.svg" style={{ height: "45px", width: "45px" }} ></Avatar>
              <Typography>FEVER</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar src="ic_add_square_o.svg" style={{ height: "45px", width: "45px" }} ></Avatar>
              <Typography>LIGHT-HEADED</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }}>
              <Avatar src="ic_add_square_o.svg" style={{ height: "45px", width: "45px" }} ></Avatar>
              <Typography>FEVER</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Symptoms
import React from "react";
import { Card, Grid, CardContent, Typography, Avatar, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";

class FutureAppointments extends React.Component {
  handleChange = () => {
    const { setAppData } = this.props
    setAppData("")
  }
  render() {
    const { history } = this.props
    return (
      <div style={{ background: "#f7f7f7", height: "100vh" }}>
        <div style={{ margin: "0px 15px 15px 15px" }}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="row"
            style={{ height: "13vh", marginTop: "3.5%" }}>
            <Typography align="center" color="textSecondary" style={{ margin: "5px 5px 2px 5px", 
            fontSize: "15px", fontWeight: 500 }}>Your nest appontment is on May 21st,Thrusday at 9:00 AM with Dr. Michael D. Dombroski</Typography>
            {"\n"}
          </Grid>
          <Card >
            <CardContent>
              <Grid style={{ display: "flex" }} onClick={()=>history.push("/user-home/generate-token")}>
                <Grid item xs={3}>
                  <Avatar />
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">Michael D.Dombroski</Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    General Physician 11 years, MBBS, MD, English and Freanch
                </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { confirmBooking = {} } = preparedFinalObject;
  return { confirmBooking }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FutureAppointments)
import React from "react";
import { Card, Grid, CardContent, Typography, Avatar, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";

class ConfirmBooking extends React.Component {
  handleChange = () => {
    const { setAppData } = this.props
    setAppData("")
  }
  render() {
    
    const { history,bookAppointmentResponse } = this.props
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
             fontSize: "15px", fontWeight: 500 }}>Please consult with {" "}Dr.
             { bookAppointmentResponse.doctor_name}</Typography>
            {"\n"}
          </Grid>
          <Card >
            <CardContent>
              <Grid style={{ display: "flex" }}>
                <Grid item xs={3}>
                  <Avatar />
                </Grid>
                <Grid item md={9}>
                  <Typography variant="h6">{bookAppointmentResponse.doctor_name}</Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                  {bookAppointmentResponse.doctor_speciality}
                </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
            <Typography variant="h6" align="center" color="textSecondary" style={{ fontSize: "15px", fontWeight: 1200 }}>Kindly click ‘Pay’  below to make the payment of &#x20b9;200.00</Typography>
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
            <Typography align="center" variant="h6" onClick={() => history.push("/user-home/payment-gateway")}>CONFIRM TIME {'&'} PAY</Typography>
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { confirmBooking = {},bookAppointment={} } = preparedFinalObject;
  const {bookAppointmentResponse}=bookAppointment
  return { confirmBooking, bookAppointmentResponse,bookAppointment}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmBooking)
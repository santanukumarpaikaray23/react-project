import React from "react";
import { Card, Grid, CardContent, Typography, Avatar, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";

class PaymentGateway extends React.Component {
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
            <Typography align="center" variant="h3" style={{ margin: "5px 5px 2px 5px", 
            fontSize: "15px", fontWeight: 500 }}>Payment Gateway Screen's flow will happen as per the Payment Gateway</Typography>
            {"\n"}
          </Grid>
          <Grid container  alignItems="center"
            justify="center"
            direction="row" style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
            <Typography variant="h6" align="center"  
            style={{ fontSize: "15px", fontWeight: 1200 }}>Kindly click on the pay button to make the payment of Rs. 200/-</Typography>
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
            <Typography align="center" variant="h6" onClick={() => history.push("/user-home/payment-successful")}>Pay</Typography>
          </Button>
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
)(PaymentGateway)
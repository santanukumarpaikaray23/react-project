import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import OtpInput from "react-otp-input";
import { httpRequest } from "../../ui-utils/api";
import { mapDispatchToProps } from "../../ui-utils/commons";

class Otp extends React.Component {
  state = {
    otpValue: ""
  };
  handleChanage = (value, otp) => {
    const { setAppData } = this.props;
      setAppData(value, otp);
  };
  handlerVerifyOtp = async () => {
    const {history, phoneno, otpValue, setAppData } = this.props;
    if(otpValue !== '' && otpValue != undefined){
    let requestBody = {
      number: phoneno,
      user_type: "patient",
      fcm_id: "fklnloOczYI:APA91bGX7PuCimRXDelXpMICeVvqDOzMOTN6cEEffoh89DoYvrFzUFdB_qVW1ZTZEPfa2lHl0BYlG8rQc6ilK2TXkMRwae2Y8SDXKwRM7hk0EFJDMp8FA8PXd7Cf8nmnpK3saO1Xetee",
      otp: otpValue,
      privilegeType: 2
    }
    const apiResponse = await httpRequest({
      endPoint: `/verifyOtp`,
      method: "post",
      instance: "instanceOne",
      requestBody
    })
    if (apiResponse.OtpVerification === true) {
      setAppData("otp.otpresponse",apiResponse);
      history.push("/user-home");
    }else{
      let snackbar = {
        open: true,
        message: "Incorrect OTP!",
        variant: "error"
      }
      setAppData("snackbar", snackbar)
    }
  }else{
    let snackbar = {
      open: true,
      message: "Provide Valid OTP!",
      variant: "error"
    }
    setAppData("snackbar", snackbar)
  }
  }
  resendOtp=async(phoneno)=>{
    const { history, setAppData } = this.props;
    const apiResponse = await httpRequest({
      endPoint: `/resendOtp/${phoneno}/patient`,
      method: "get",
      instance: "instanceOne",
    })
    if (apiResponse===true) {
      let snackbar = {
        open: true,
        message: "OTP sent successfully!",
        variant: "error"
      }
      setAppData("snackbar", snackbar)
    }
  }
  render() {
    const {otpValue,phoneno } = this.props
    let count=otpValue.toString().length;
    return (
      <div>
        <img width="100%" height="100%" src='background.png' alt="verify_icon" style={{
          position: "relative",
          clipPath: 'inset(10% 10% 10% 10% round 20%, 20%)'
        }} />
        <img width="30%" height="20%" src='logo.svg' alt="verify_icon" style={{ left: 125, top: 8, position: "absolute" }} />
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          // style={{ height: "100vh" }}
          style={{ padding: "0px 30px 0px 30px" }}
        >
          <Typography variant="subtitle2" color="textSecondary" gutterBottom >Enter</Typography>
          <Typography>
            <OtpInput
              value={otpValue}
              onChange={otp => this.handleChanage("otp.otpValue", otp)}
              numInputs={6}
              isInputNum={true}
              //input
              separator={<span>&nbsp;&nbsp;&nbsp;</span>}
              inputStyle={{
                // width: "0em",
                borderWidth: "0px",
                width: "22px",
                outline : "none",
                borderBottom: "2px solid #2FC9B9"
              }}
            />
          </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom style={{ marginTop: "2%" }}>{count}/6</Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom onClick={() => this.resendOtp(phoneno)}>Resend OTP</Typography>
          <Button
            size="large"
            variant="contained"
            style={{
              background: "#2FC9B9",
              borderRadius: "20px",
              width: "260px",
              color: "white"
            }}
            onClick={() => this.handlerVerifyOtp()}
          >
            <Typography variant="h6">Login</Typography>
          </Button>
        </Grid>
      </div>

    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { login = {}, otp = {}, userProfile = {} } = preparedFinalObject;
  const { otpValue="", otpresponse ={} } = otp
  const { phoneno } = login
  const { userData } = userProfile
  return { login, phoneno, otpValue, otp, otpresponse, userData }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Otp)
import React from "react";
import { Button, Grid, Typography, TextField, Card, ThemeProvider, createMuiTheme, Switch, withStyles } from "@material-ui/core";
import { mapDispatchToProps } from "../../ui-utils/commons";
import { httpRequest } from "../../ui-utils/api"
import { connect } from "react-redux";

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid #2FC9B9',
        },
        '&:before': {
          borderBottom: '2px solid #2FC9B9',
        },
      },
    },
  }
});

const AntSwitch = withStyles(theme => ({
  switchBase: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.primary.main
    },
  },
  checked: {},
  track: {},
  // root: {
  //   width: 50,
  //   height: 24,
  //   padding: 2
  // },
  // switchBase: {
  //   padding: 2,
  //   color: theme.palette.grey[500],
  //   "&$checked": {
  //     transform: "translateX(12px)",
  //     color: theme.palette.common.white,
  //     "& + $track": {
  //       opacity: 1,
  //       backgroundColor: theme.palette.primary.main,
  //       borderColor: theme.palette.primary.main
  //     }
  //   }
  // },
  // thumb: {
  //   marginTop: "1%",
  //   width: 20,
  //   height: 20,
  //   boxShadow: "none"
  // },
  // track: {
  //   border: `0.5px solid ${theme.palette.grey[500]}`,
  //   // borderRadius: 16 / 2,
  //   borderRadius: "31px",
  //   borderRadius: "31px",
  //   opacity: 1,
  //   backgroundColor: theme.palette.common.white
  // },
  // checked: {
  //   color:"white"
  // }
}))(Switch);

class Login extends React.Component {
  state = {
  };
  handleChanage = (value, otp) => {
    console.log(otp);
    this.setState({
      [value]: otp
    });
  };
  loginChange = () => {
    const { setAppData } = this.props
    setAppData("login.receiveOtp", true)
  }
  validatePhoneNumber = (e) => {
    
    // const { setAppData,login={} } = this.props;
    // setAppData("login.phoneno",'9008337558');//7022463389  7091921338
    const { setAppData,login={} } = this.props;
    const {phoneno}=login;
    let phone = /^\d+$/;
    if (phoneno&&phoneno.length===1) {
      setAppData("login.phoneno", "");
    }
    if(e.target.value.match(phone)){
    setAppData("login.phoneno",e.target.value);
    }
  };
  handlerRequestOtp = async () => {
    const { history, checked, phoneno, setAppData } = this.props;
    //const {checked} = login;
    if(phoneno !== '' && phoneno !== undefined ){
      if(phoneno.length == 10){
      if(checked){
    const apiResponse = await httpRequest({
      endPoint: `/requestOtp/${phoneno}/Patient`,
      method: "get",
      instance: "instanceOne",
    })
    if ((apiResponse === true)){// && (checked === true)) {
      history.push(`/Otp`)
    }else{
      let snackbar = {
        open: true,
        message: "Try again with valid number",
        variant: "error"
      }
      setAppData("snackbar", snackbar)
    }
  }else{
    let snackbar = {
      open: true,
      message: "Agree Terms and Conditions.",
      variant: "error"
    }
    setAppData("snackbar", snackbar)
  }
}else{
  let snackbar = {
    open: true,
    message: "Provide Valid number",
    variant: "error"
  }
  setAppData("snackbar", snackbar)

}
  }else{
    let snackbar = {
      open: true,
      message: "Mobile Number not empty.",
      variant: "error"
    }
    setAppData("snackbar", snackbar)
  }
  }
  render() {
    const { setAppData, phoneno, mobile, receiveOtp, checked,history } = this.props
    const { validatePhoneNumber, handlerRequestOtp } = this
    return (
      <div style={{ background: "#F8F8F8" }}>
        <img width="100%" height="100%" src='background.png' alt="verify_icon" style={{ position: "relative" }} />
        <img width="30%" height="20%" src='logo.svg' alt="verify_icon" style={{ left: 125, top: 8, position: "absolute" }} />
        <Grid style={{ padding: "0px 50px 0px 50px", height: "68.5vh" }}>
          <Typography variant="subtitle2" color="textSecondary" >Mobile Number</Typography>
          <Card style={{ boxShadow: "none" }}>
            <ThemeProvider theme={theme}>
              <TextField pattern = "[0-9] {3} - [0-9] {2} - [0-9] {3}"
               required={true}
               fullWidth
              value={phoneno}
                onChange={(e) => validatePhoneNumber(e)}>
              </TextField>
            </ThemeProvider >
          </Card>
          {mobile ? (
            <Typography variant="caption" color="textSecondary" >Assistive Text</Typography>
          ) : (
              ""
            )}
          {/* <Typography variant="caption" color="textSecondary" >Assistive Text</Typography> */}
          <br />
          {receiveOtp ?
            <Grid container>
              <AntSwitch
                checked={checked}
                onChange={(e) => setAppData("login.checked", !checked)}
                name="ViewSwitch" />
              <Typography variant="subtitle2" color="textSecondary" style={{ marginLeft: "3%", marginTop: "4%" }}>Agree</Typography>
              <Typography variant="subtitle2" color="primary" style={{ marginLeft: "1%", marginTop: "4%" }}>Terms and Conditions</Typography>
            </Grid> : ""}
          <br />
          {receiveOtp ?
            <Button
              size="large"
              variant="contained"
              style={{
                background: "#2FC9B9",
                borderRadius: "20px",
                width: "257px",
                color: "white"
              }}
              onClick={() => handlerRequestOtp()}>
              <Typography variant="h6">RECEIVE OTP</Typography>
            </Button>
            :
            <Button
              size="large"
              variant="contained"
              style={{
                background: "#2FC9B9",
                borderRadius: "20px",
                width: "257px",
                color: "white"
              }}
              onClick={() => this.loginChange()}
              // onClick={() => history.push("/user-home/video-call")}
              >
              <Typography variant="h6">Login</Typography>
            </Button>}
          <br />
          <br />
          <Typography align="center" variant="subtitle2" color="textSecondary">Verify with the OTP once received
        </Typography>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  
  const { preparedFinalObject = {} } = screenConfiguration;
  const { login = {} } = preparedFinalObject;
  const { phoneno, mobile, receiveOtp = false, checked = false } = login
  return { login, phoneno, mobile, receiveOtp, checked }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
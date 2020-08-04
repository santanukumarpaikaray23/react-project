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
  root: {
    width: 50,
    height: 24,
    padding: 2
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    marginTop: "1%",
    width: 20,
    height: 20,
    boxShadow: "none"
  },
  track: {
    border: `0.5px solid ${theme.palette.grey[500]}`,
    // borderRadius: 16 / 2,
    borderRadius: "31px",
    borderRadius: "31px",
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
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
    const { receiveOtp, setAppData, history } = this.props
    setAppData("login.receiveOtp", true)
    // history.push("/Otp")
  }
  validatePhoneNumber = (e) => {
    debugger
    const { setAppData } = this.props;
    let phone = /^\d{10}$/;
    if (e.match(phone)) {
      setAppData("login.mobile", false);
    } else {
      setAppData("login.mobile", true);
    }
    setAppData("login.phoneno", parseInt(e, 10));
    const { phoneno } = this.props;
    if (isNaN(phoneno)) {
      setAppData("login.phoneno", 0);
    }
  };

  handlerRequestOtp = async () => {
    const { setAppData, history, checked, phoneno } = this.props;
    const apiResponse = await httpRequest({
      endPoint: `/requestOtp/${phoneno}/Patient`,
      method: "get",
      instance: "instanceOne",
    })
    if ((apiResponse === true) && (checked === true)) {
      history.push(`/Otp`)
    }
  }
  render() {
    const { history, setAppData, phoneno, mobile, receiveOtp, checked } = this.props
    const { validatePhoneNumber, handlerRequestOtp } = this
    return (
      <div style={{ background: "#F8F8F8" }}>
        <img width="100%" height="100%" src='background.png' alt="verify_icon" style={{ position: "relative" }} />
        <img width="30%" height="20%" src='logo.svg' alt="verify_icon" style={{ left: 125, top: 8, position: "absolute" }} />
        <Grid style={{ padding: "0px 50px 0px 50px", height: "68.5vh" }}>
          <Typography variant="subtitle2" color="textSecondary" >Mobile Number</Typography>
          <Card style={{ boxShadow: "none" }}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                value={phoneno}
                // style={{ borderBottom: "1px solid #2FC9B9"}}
                onChange={(e) => validatePhoneNumber(e.target.value)}>
              </TextField>
            </ThemeProvider >
          </Card>
          {mobile ? (
            <Typography color="error" variant="subtitle1">
              Please enter a valid phone number
            </Typography>
          ) : (
              ""
            )}
          <Typography variant="caption" color="textSecondary" >Assistive Text</Typography>
          <br />
          <br />
          {receiveOtp ?
            <Grid container>
              <AntSwitch
                checked={checked}
                onChange={(e) => setAppData("login.checked", !checked)}
                name="ViewSwitch" />
              <Typography variant="subtitle2" color="textSecondary" style={{ marginLeft: "3%", marginTop: "2%" }}>Agree for</Typography>
              <Typography variant="subtitle2" color="primary" style={{ marginLeft: "1%", marginTop: "2%" }}>Terms and Conditions</Typography>
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
              <Typography variant="Button">RECEIVE OTP</Typography>
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
              onClick={() => this.loginChange()}>
              <Typography variant="Button">Login</Typography>
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
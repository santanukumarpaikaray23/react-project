import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles, ThemeProvider, createMuiTheme, Avatar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import UserRoutes from "../../../../ui-routes/UserRoutes";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { mapDispatchToProps } from "../../../../ui-utils/commons";
import { withRouter } from "react-router-dom";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import "./index.css"

var headings = [
  {
    id: "/user-home",
    heading: "LIVE MY LIFE",
  },
  {
    id: `/user-home/home/symptoms`,
    heading: "BOOK APPOINTMENT"
  },
  {
    id: `/user-home/home/specialists`,
    heading: "BOOK APPOINTMENT"
  },
  {
    id: `/user-home/book-appointment`,
    heading: "BOOK APPOINTMENT"
  },
  {
    id: `/user-home/confirm-booking`,
    heading: "CONFIRM BOOKING"
  },
  {
    id: "/user-home/chat",
    heading: "CHAT",
  },
  {
    id: "/user-home/calendar",
    heading: "CALENDAR",
  },
  {
    id: "/user-home/profile",
    heading: "PROFILE",
  },
  {
    id: "/user-home/records",
    heading: "RECORDS",
  },
];
const styles = (theme) => ({
  root: {
    // display: "flex",
    // height:'100vh',
    // width:"100vw"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // background: "white"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // padding: "0 8px",
    // ...theme.mixins.toolbar,
    minHeight: "47px",
  },
  content: {
    // flexGrow: 1,
    // padding: "8px 8px 8px",
  },
  webHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    flexGrow: 1,
    fontSize: "16px"
    // marginLeft: "16px",
  },
  iconColor: {
    color: "white"
  },
  bottom: {
    // paddingLeft:"10px",
    // paddingRight:"10px",
    width: "360px",
    position: "fixed",
    top: "auto",
    background: "#eeeeee",
    bottom: 0
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      label: {
        justifyContent: "start"
      },
      root: {
        padding: "7px"
      }
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: "0px",
        paddingRight: "0px"
      }
    },
  },
});

class MiniDrawer extends React.Component {
  state = {
    value: "home"
  };
  componentDidMount = () => {
    const { setAppData } = this.props
    setAppData("userInfo.home", true)
  }
  handleChange = (event, newValue) => {
    const { setAppData, userInfo } = this.props
    this.setState({ value: newValue });
    setAppData("userInfo", { ...userInfo, home: false, chat: false, calendar: false, profile: false, recents: false })
    setAppData(`userInfo.${newValue}`, true)

  };
  render() {
    const { classes, history, bottomBoolean, setAppData, userInfo } = this.props;
    const { value } = this.state;
    const { handleChange } = this
    let endPoint = document.location.hash.split("#")[1];
    return (
      <div className={classes.root}>
        <CssBaseline />
        {headings && headings.map((item, index) => {
          return (
            endPoint === item.id ?
              <AppBar
                elevation={0}
                // key={index}
                position="fixed"
                className={classNames(classes.appBar)}>
                <ThemeProvider theme={theme}>
                  <Toolbar style={{ display: "flex" }}>
                    <IconButton
                      onClick={(e) => {
                        history.goBack();
                      }}
                      classes={{ root: classes.iconColor }}>
                      <div style={{ borderRadius: "50%", background: "white", width: "50px", height: "50px" }}>
                        <img width="90%" height="120%" src='logo-no-title.svg' alt="verify_icon" />
                      </div>
                    </IconButton>
                    <Typography
                      variant="h6"
                      color="inherit"
                      noWrap classes={{ root: classes.webHeader }}
                    ><span>{item.heading}</span>
                    </Typography>
                  </Toolbar>
                </ThemeProvider>
              </AppBar>
              : ""
          );
        })}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <UserRoutes />
        </main>
        <BottomNavigation value={value} onChange={handleChange} className={classes.bottom}>
          <BottomNavigationAction label="Home" value="home" icon={
            userInfo.home ?
              <img width="60%" height="60%" src='ic_home_f.svg' alt="verify_icon"
              />
              : <img width="60%" height="60%" src='ic_home_o.svg' alt="verify_icon" />}
            onClick={() => { history.push("/user-home") }} />
          <BottomNavigationAction label="Chat" value="chat" icon={!userInfo.chat ?
            <img width="60%" height="60%" src='ic_chat_o.svg' alt="verify_icon" /> :
            <img width="60%" height="60%" src='ic_chat_f.svg' alt="verify_icon" />}
            onClick={() => history.push("/user-home/chat")} />
          <BottomNavigationAction label="Calendar" value="calendar" icon={!userInfo.calendar ?
            <img width="60%" height="60%" src='ic_caleandar_o.svg' alt="verify_icon" /> :
            <img width="60%" height="60%" src='ic_caleandar_f.svg' alt="verify_icon" />}
            onClick={() => history.push("/user-home/calendar")} />
          <BottomNavigationAction label="Profile" value="profile" icon={!userInfo.profile ?
            <img width="60%" height="60%" src='ic_profile_o.svg' alt="verify_icon" /> :
            <img width="60%" height="60%" src='ic_profile_f.svg' alt="verify_icon" />}
            onClick={() => history.push("/user-home/profile")} />
          <BottomNavigationAction label="Records" value="recents" icon={!userInfo.recents ?
            <img width="60%" height="60%" src='ic_records_o.svg' alt="verify_icon" /> :
            <img width="60%" height="60%" src='ic_records_f.svg' alt="verify_icon" />}
            onClick={() => history.push("/user-home/records")} />
        </BottomNavigation>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { userInfo = {}, selectedLanguage } = preparedFinalObject;
  const { user = {}, bottomBoolean = true } = userInfo;
  return { user, selectedLanguage, bottomBoolean, userInfo };
};

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(withTranslation()(MiniDrawer)))
);

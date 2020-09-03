import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
  // const history = useHistory();

  console.log(props.childern,"iiii")
  return (
    <Typography component="div">
      {/* {props.children==="one"?history.push("/user-home/user-screen/specialists"):history.push("/user-home/user-screen/symptoms")} */}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class TabsWrappedLabel extends React.Component {
  state = {
    value: "one"
  };
componentDidMount=()=>{
  const {history}=this.props
  history.push("/user-home/calendar/today-appointments")
}
  handleChange = (event, value) => {
      const {history}=this.props
    this.setState({ value });
    if(value==="one"){
    history.push("/user-home/calendar/today-appointments")
    }
    else{
      history.push("/user-home/calendar/future-appointments")
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" >
          <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
            <Tab style={{fontSize:"11px"}}
              value="one"
              label="TODAY'S APPOINTMENT"
            />
            <Tab value="two" style={{fontSize:"11px"}}label="ALL FUTURE APPOINTMENT" />
          </Tabs>
        </AppBar>
        {value === "one" && <TabContainer>Item One</TabContainer>}
        {value === "two" && <TabContainer>Item Two</TabContainer>}
      </div>
    );
  }
}

TabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TabsWrappedLabel);

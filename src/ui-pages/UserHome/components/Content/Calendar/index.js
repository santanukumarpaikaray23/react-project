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
  history.push("/user-home/user-screen/calendar/symptoms")

}
  handleChange = (event, value) => {
      const {history}=this.props
    this.setState({ value });
    if(value==="one"){
    history.push("/user-home/user-screen/calendar/symptoms")
    }
    else{
      history.push("/user-home/user-screen/calendar/specialists")
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
            <Tab
              value="one"
              label="SYMPTOMS"
            />
            <Tab value="two" label="SPECIALISTS" />
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

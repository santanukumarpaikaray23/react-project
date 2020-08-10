import React from "react";
import PropTypes from "prop-types";
import { withStyles,Grid,Button,Paper } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";

function TabContainer(props) {
  const history = useHistory();

  console.log(props.childern, "iiii")
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
  componentDidMount = () => {
    const { history } = this.props
    history.push("/user-home/home/symptoms")
  }
  handleChange = (event, value) => {
    const { history } = this.props
    this.setState({ value });
    if (value === "one") {
      history.push("/user-home/home/symptoms")
    }
    else {
      history.push("/user-home/home/specialists")
    }
  };
  handleNextButton=()=>{
    debugger
    const{history}=this.props;
    history.push("/user-home/book-appointment")
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const{handleNextButton}=this
    return (
      <div className={classes.root}>
        <AppBar position="static" >
          <Tabs variant="fullWidth" position="fixed" value={value} onChange={this.handleChange}>
            <Tab
              value="one"
              label="SYMPTOMS" style={{ fontSize: "14px" }}
            />
            <Tab value="two" label="SPECIALISTS" style={{ fontSize: "14px" }} />
          </Tabs>
        </AppBar>
        {value === "one" && <TabContainer>Item One</TabContainer>}
        {value === "two" && <TabContainer>Item Two</TabContainer>}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Paper typeof="button"
            style={{
              width:"70px",
              height:"30px",
              position: "fixed",
              bottom: "62px",
              // padding: "8px",
              borderRadius: "40px",
              background:"#2FC9B9"
            }} onClick={()=>handleNextButton()}
          ><Typography style={{display: "flex",marginTop:"7%",
            justifyContent: "center",
            color: "aliceblue"}}
        >NEXT</Typography>
                  <Button
                ></Button>
        </Paper>
        </div>
      </div>
    );
  }
}

TabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TabsWrappedLabel);

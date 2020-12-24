import React from "react";
import { withRouter } from "react-router-dom";
import Snackbar from "./ui-containers/SnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import { mapDispatchToProps } from "./ui-utils/commons";
import MainRoutes from "./ui-routes/MainRoutes";
import { connect } from "react-redux";
import "./App.css";
import Amplify from "aws-amplify";
import aws_eorts from "../src/aws-exports";
// import { withAuthenticator } from "aws-amplify-react"

class App extends React.Component {

  render() {
     const { spinner } = this.props;
    return (
      <div>
    
      <Hidden only={["xs"]}>
          <Grid
            container
            alignItems="center"
            justify="center"
            classes={{ root: "custom-fullhieght" }}
          >
            <Typography variant="h5">
              No web view, please open in mobile or tablet
            </Typography>
          </Grid>
        </Hidden>
        <Hidden only={["sm", "md", "lg", "xl"]}>
        <MainRoutes />
        </Hidden>
        <Snackbar />
        {spinner && (
          <div className="custom-spinner">
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { spinner, selectedLanguage = "en" } = preparedFinalObject;
  return { spinner, selectedLanguage };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // )(withRouter(withAuthenticator(App,true)));
)(withRouter(App));


import React from "react";
import { Card, Grid, CardContent, Typography, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { mapDispatchToProps, getTime, getDateandDay } from "../../../../../ui-utils/commons";



class Personal extends React.Component {
  render() {
    const { landing, todaylatest,preparedFinalObject,latestAppointment,screenConfiguration } = this.props
   console.log("userPRofile",preparedFinalObject);
    return (
      <div style={{ background: "#f7f7f7", height: "100vh" }}>
        <div style={{ margin: "0px 15px 15px 15px" }}>
         
         {/* <h2>Personal</h2> */}
         <Card style={{width:"100%",background:"#f7f7f7",boxShadow:"none" }}>
             <CardContent>
              <Grid style={{ display: "flex"}}>
                  <Grid item xs={3}>
                      <Avatar />
                  </Grid>
                <Grid item md={9}>
                      <Typography variant="h6" >ddd</Typography>
                      <Typography color="textSecondary" variant="subtitle2">
                            {/* {latestAppointment.doctorSpeciality} */}
                      </Typography>
                </Grid>
                </Grid>
                  {/* <Typography color="textSecondary" variant="subtitle2">Answers on chat time {getTime(dData.appointmentDate)}</Typography> */}
              </CardContent>
         </Card>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = ({ screenConfiguration }) => {
//   const { preparedFinalObject = {} } = screenConfiguration;
//   const { userId } = preparedFinalObject;
//   const { user } = userId;
//   return { user } 
// };

const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { userProfile = {} } = preparedFinalObject;
  return { userProfile } 
};

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Personal)
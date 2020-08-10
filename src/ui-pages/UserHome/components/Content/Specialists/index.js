import React from "react";
import { Card, Grid, CardContent, Typography, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { httpRequest } from "../../../../../ui-utils/api";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";

class Specialists extends React.Component {
  componentDidMount=()=>{
    const {setAppData,specialists}=this.props
    setAppData("specialists",{...specialists,generalPhysician:false,pediatrician:false,phychiatrist:false,
      gynaecologist:false,dermatologist:false
     })
  }
  checkedHandle=(key,value)=>{
    const {setAppData}=this.props
    setAppData(key,value)
  }
  render() {
    const { history,specialists } = this.props
    const {checkedHandle}=this
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          style={{ height: "10vh" }}>
          <Typography variant="h6" color="textSecondary">Find your doctor by specialists</Typography>
          {"\n"}
        </Grid>
        <Card style={{ margin: "0px 15px 15px 15px" }} onClick={()=>checkedHandle("specialists.generalPhysician",!specialists.generalPhysician)}>
          <CardContent>
          {specialists.generalPhysician===true?
              <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",
              zIndex:"1",background:"#F7F7F7",borderRadius: "50%"}}></img>:""}
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_physician_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6"> General Physician</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
               </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }} onClick={()=>checkedHandle("specialists.pediatrician",!specialists.pediatrician)}>
          <CardContent>
          {specialists.pediatrician===true?
              <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",
              zIndex:"1",background:"#F7F7F7",borderRadius: "50%"}}></img>:""}
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_pediatrician_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6"> Pediatrician </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }} onClick={()=>checkedHandle("specialists.phychiatrist",!specialists.phychiatrist)}>
          <CardContent>
          {specialists.phychiatrist===true?
              <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",
              zIndex:"1",background:"#F7F7F7",borderRadius: "50%"}}></img>:""}
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_psychiatrist_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6">Phychiatrist</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }} onClick={()=>checkedHandle("specialists.gynaecologist",!specialists.gynaecologist)}>
          <CardContent>
          {specialists.gynaecologist===true?
              <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",
              zIndex:"1",background:"#F7F7F7",borderRadius: "50%"}}></img>:""}
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_gynaecologist_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6">Gynaecologist</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ margin: "15px" }} onClick={()=>checkedHandle("specialists.dermatologist",!specialists.dermatologist)}>
          <CardContent>
          {specialists.dermatologist===true?
              <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",
              zIndex:"1",background:"#F7F7F7",borderRadius: "50%"}}></img>:""}
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="110%" height="110%" src='ic_dermatologist_f.svg' alt="verify_icon" />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6">Dermatologist</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { specialists = {} } = preparedFinalObject;
  return { specialists}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Specialists)
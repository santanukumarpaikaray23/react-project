import React from "react";
import { Card, Grid, CardContent, Typography, Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import { httpRequest } from "../../../../../ui-utils/api";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";

class Specialists extends React.Component {
  componentDidMount=()=>{
    const {setAppData,specialists}=this.props
  this.getSpecialities()
  }
  getSpecialities=async()=>{
    const { setAppData, history } = this.props;
    const apiResponse = await httpRequest({
      endPoint: `/specialityList/1`,
      method: "get",
      instance: "instanceOne",
    })
    if (apiResponse) {
      setAppData("specialists.response",apiResponse)
    }
  }
  checkedHandle=async(key,value)=>{
    const { setAppData, history,phoneno,specialists } = this.props;
    const {specialistsName}=specialists
    setAppData("specialists.specialistsName",value)
    let requestBody={
      number:phoneno,
      symptom:"abdomen,back",
      speciality:"Depression",
    }
    const apiResponse = await httpRequest({
      endPoint: `/bookAppointment`,
      method: "post",
      instance: "instanceOne",
      requestBody
    })
    if (apiResponse.doctor) {
      setAppData("bookAppointment",apiResponse)
      history.push("/user-home/book-appointment")
    }
  }
  render() {
    const { history,specialists } = this.props
    const {checkedHandle}=this
    return (
      <div style={{ background: "#f7f7f7", height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          style={{ height: "10vh" }}>
          <Typography variant="h6" color="textSecondary">Find your doctor by specialists</Typography>
          {"\n"}
        </Grid>
        {specialists&&specialists.response&&specialists.response.map((data,index)=>{
          return(
        <Card style={{ margin: "0px 15px 15px 15px" }} onClick={()=>checkedHandle(index,data.name)}>
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
              <img width="80%" height="100%" src={`${data.url}.svg`} alt="verify_icon" />
              </Grid>
              <Grid item xs={9}>
              <Typography variant="h6"> {data.name}</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  you can book an appointment and  visit the doctor at hospital
               </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
          )
        })}
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { specialists,login = {} } = preparedFinalObject;
  const { phoneno } = login
  return { specialists,phoneno,login}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Specialists)
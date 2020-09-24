import React from "react";
import { Card, Grid, CardContent, Typography, Avatar } from "@material-ui/core";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api"
import { connect } from "react-redux";

class ChatScreen extends React.Component {
  constructor(props){
    super(props)

  }
  componentDidMount(){
    ;
    const {todayAppointment, setAppData} = this.props
    if(todayAppointment != '' && todayAppointment != undefined){
    this.getDoctorsList(todayAppointment[0].patient_id);
    }else{
      setAppData("docterRes.chattext", 'No Chat Available')
    }
  }

  getDoctorsList = async(patientId) =>{
    const { setAppData } = this.props;
    const doctorRes = await httpRequest({
      endPoint: `/doctor-list/`+patientId,
      method: "get",
      instance: "instanceOne",
    })
    if(doctorRes){
      setAppData("docterRes.chattext", 'Whom do you want to chat with?')
    setAppData("docterRes.doctorList", doctorRes)
    }
  }

  render() {
    
    const { history, todayAppointment, setAppData, docterRes } = this.props
    console.log(docterRes.doctorList);
    return (
       <div style={{ background: "#f7f7f7", height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          style={{ height: "10vh" }}>
          <Typography variant="h6" color="textSecondary">{docterRes.chattext}</Typography>
          {"\n"}
        </Grid>
        {docterRes && docterRes.doctorList && docterRes.doctorList.map((dData, index) => {
          return (
                  <div>
                   
                  <Card style={{ margin: "0px 15px 15px 15px" }} onClick={()=>{setAppData("chatToken.appointment",dData);
                             history.push("/user-home/chating")}}>
                    <CardContent>
                      <Grid style={{ display: "flex" }}>
                        <Grid item xs={3}>
                          <Avatar />
                        </Grid>
                        <Grid item md={9}>
                          <Typography variant="h6" >{dData.appointment_id}</Typography>
                          <Typography color="textSecondary" variant="subtitle2">
                            {dData.Doctor_speciality}
                          </Typography>
                        </Grid>
                      </Grid>
                  <Typography color="textSecondary" variant="subtitle2">Answers on chat {dData.slot_time}</Typography>
                    </CardContent>
                  </Card>
                  </div>
                )}) }
                
              </div>
    );
  }
}

const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { docterRes = {}, login = {}, landing = {} } = preparedFinalObject;
  const { todayAppointment } = landing
  const { phoneno } = login
  return { docterRes, phoneno, landing, todayAppointment }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen)


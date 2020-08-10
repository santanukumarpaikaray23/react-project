import React from "react";
import { Card, Grid, CardContent, Typography, Avatar, Paper, Button } from "@material-ui/core";
import { httpRequest } from "../../../../../ui-utils/api"
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";

class BookAppointment extends React.Component {
  handleNextButton=async()=>{
    debugger
    const { setAppData, history, checked, phoneno } = this.props;
   let requestBody={
      number:phoneno,
      symptom:"Cold,fever",
      speciality:"Depression",
      appointment_datetime:"2014-07-04T12:08:56"
    }
    const apiResponse = await httpRequest({
      endPoint: `/bookAppointment`,
      method: "post",
      instance: "instanceOne",
      requestBody
    })
    if (apiResponse.doctor) {
      setAppData("bookAppointment",apiResponse)
    }
  }
  handleChange=()=>{
    const {setAppData}=this.props
    setAppData("")
  }
  render() {
    const { history,bookAppointment } = this.props
    const {handleNextButton,handleChange}=this
    return (
      <div style={{ background: "#f7f7f7", height: "100vh"}}>
        <div style={{margin: "0px 15px 15px 15px"}}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          style={{ height: "13vh", marginTop: "3.5%" }}>
          <Typography  align="center"  color="textSecondary" style={{margin:"5px 5px 2px 5px",fontSize:"15px",fontWeight:500}}>We recommend you to meet Dr.Michael D Dombroksi at  our Hospital</Typography>
          {"\n"}
        </Grid>
        <Card >
          <CardContent>
            <Grid style={{ display: "flex" }}>
              <Grid item xs={3}>
                <Avatar />
              </Grid>
              <Grid item md={9}>
                <Typography variant="h6" > Michael D.Dombroski</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  General Physician 11 years, MBBS, MD, English and Freanch
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid style={{display:"flex",marginTop:"10px",marginBottom:"10px"}}>
        <Typography   variant="h6" >SELECT DATE {'&'} TIME:</Typography>
    <Typography   variant="h6" color="primary" style={{marginLeft:"7px"}}> {""}AUGUST</Typography>
        </Grid>
        <Typography align="center" color="textSecondary" variant="subtitle2" style={{margin:"5px 0px 5px 0px"}}>Select your date</Typography>
        <Grid container>
        <Typography align="center" style={{margin:"3px"}}>
          <Card style={{width:"40px",height:"60px"}} onClick={()=>handleChange("bookAppointment.")}>
            <Typography style={{fontSize:"10px"}} color="textSecondary">TODAY</Typography>
            <Typography  color="textSecondary" variant="h5">11</Typography>
            <Typography  color="textSecondary">TUE</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"3px"}}>
          <Card style={{width:"40px",height:"60px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography style={{marginBottom:"14px"}} color="textSecondary"></Typography>
            <Typography  color="textSecondary" variant="h5">12</Typography>
            <Typography  color="textSecondary">WED</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"3px"}}>
          <Card style={{width:"40px",height:"60px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography style={{marginBottom:"14px"}} color="textSecondary"></Typography>
            <Typography  color="textSecondary" variant="h5">13</Typography>
            <Typography  color="textSecondary">THRU</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"3px"}}>
          <Card style={{width:"40px",height:"60px",boxShadow:"none",background:"#2FC9B9"}}>
            <Typography style={{marginBottom:"14px"}} color="textSecondary"></Typography>
            <Typography  color="textSecondary" style={{color:"white"}} variant="h5">14</Typography>
            <Typography  color="textSecondary" style={{color:"white"}}>FRI</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"3px"}}>
          <Card style={{width:"40px",height:"60px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography style={{marginBottom:"14px"}} color="textSecondary"></Typography>
            <Typography  color="textSecondary" variant="h5">15</Typography>
            <Typography  color="textSecondary">SAT</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"3px"}}>
          <Card style={{width:"40px",height:"60px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography style={{marginBottom:"14px"}} color="textSecondary"></Typography>
            <Typography  color="textSecondary" variant="h5">16</Typography>
            <Typography  color="textSecondary">SUN</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"3px"}}>
          <Card style={{width:"40px",height:"60px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography style={{marginBottom:"14px"}} color="textSecondary"></Typography>
            <Typography  color="textSecondary" variant="h5">17</Typography>
            <Typography  color="textSecondary">MON</Typography>
          </Card>
        </Typography>
        </Grid>
        <Typography align="center" color="textSecondary" variant="subtitle2" style={{margin:"5px 0px 5px 0px"}}>Select your time</Typography>
        <Grid container>
        <Typography align="center" style={{margin:"2px 12px 2px 12px"}}>
          <Card style={{width:"40px",height:"45px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography  color="textSecondary" variant="h5">09</Typography>
            <Typography  color="textSecondary">AM</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"2px 12px 2px 12px"}}>
          <Card style={{width:"40px",height:"45px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography  color="textSecondary" variant="h5">10</Typography>
            <Typography  color="textSecondary">AM</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"2px 12px 2px 12px"}}>
          <Card style={{width:"40px",height:"45px",boxShadow:"none",background:"#2FC9B9"}}>
            <Typography  color="textSecondary" variant="h5" style={{color:"white"}}>11</Typography>
            <Typography  color="textSecondary" style={{color:"white"}}>AM</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"2px 12px 2px 12px"}}>
          <Card style={{width:"40px",height:"45px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography  color="textSecondary" variant="h5">12</Typography>
            <Typography  color="textSecondary">AM</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"2px 12px 2px 12px"}}>
          <Card style={{width:"40px",height:"45px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography  color="textSecondary" variant="h5">01</Typography>
            <Typography  color="textSecondary">PM</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"2px 12px 2px 12px"}}>
          <Card style={{width:"40px",height:"45px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography  color="textSecondary" variant="h5">02</Typography>
            <Typography  color="textSecondary">PM</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"2px 12px 2px 12px"}}>
          <Card style={{width:"40px",height:"45px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography  color="textSecondary" variant="h5">03</Typography>
            <Typography  color="textSecondary">PM</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"2px 12px 2px 12px"}}>
          <Card style={{width:"40px",height:"45px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography  color="textSecondary" variant="h5">04</Typography>
            <Typography  color="textSecondary">PM</Typography>
          </Card>
        </Typography>
        <Typography align="center" style={{margin:"2px 12px 2px 12px"}}>
          <Card style={{width:"40px",height:"45px",boxShadow:"none",background:"#f7f7f7"}}>
            <Typography  color="textSecondary" variant="h5">05</Typography>
            <Typography  color="textSecondary">PM</Typography>
          </Card>
        </Typography>
        </Grid>
        <Grid container>
        <Typography  align="center" variant="h6" color="textSecondary" style={{fontWeight:500,fontSize:"15px",margin:"3px"}}>Your appointment 
        with Dr.Michael D.Dombroksi has been scheduled on June 14, Friday at 11 AM</Typography>
        </Grid>
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
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { bookAppointment = {} } = preparedFinalObject;
  return { bookAppointment}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookAppointment)
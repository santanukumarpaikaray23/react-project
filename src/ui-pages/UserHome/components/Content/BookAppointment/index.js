import React from "react";
import { Card, Grid, CardContent, Typography, Avatar, Paper, Button } from "@material-ui/core";
import { httpRequest } from "../../../../../ui-utils/api"

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
  render() {
    const { history } = this.props
    const {handleNextButton}=this
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          style={{ height: "12vh", marginTop: "3.5%" }}>
          <Typography  align="center" variant="h6" color="textSecondary" style={{margin:"5%"}}>We recommend you to meet Dr.Michael D Dombroksi at  our Hospital</Typography>
          {"\n"}
        </Grid>
        <Card style={{ margin: "0px 15px 15px 15px" }}>
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
        <Typography  align="center" variant="h6" style={{margin:"5%"}}>SELECT TIME:</Typography>
        <Typography  align="center" variant="h6" color="textSecondary" style={{margin:"5%"}}>Your appointment 
        with Dr.Michael D.Dombroksi has been scheduled on June 13, Wednesday at 10:30 AM</Typography>
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
export default BookAppointment;
import React from "react";
import { Card, Grid, CardContent, Typography, Avatar, Paper, Button } from "@material-ui/core";
import { httpRequest } from "../../../../../ui-utils/api"
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
// import Symptoms from "../Symptoms";

// videoid,hospital,token,chatid/useRadioGroup
class BookAppointment extends React.Component {
  componentDidMount = async () => {
    const { setAppData, doctorId } = this.props;
    let dates = []
    let days = [{ number: 1, day: "Mon" }, { number: 2, day: "Tue" }, { number: 3, day: "Wed" }, { number: 4, day: "Thru" }, { number: 5, day: "Fri" },
    { number: 6, day: "Sat" }, { number: 7, day: "Sun" }]
    setAppData("bookAppointment.dates", dates)
    const apiResponse = await httpRequest({
      endPoint: `/bookingSlots/${doctorId}`,
      method: "get",
      instance: "instanceOne",
    })
    if (apiResponse) {
      let uniqueArray = []
      apiResponse.forEach((data) => {
        let datee = data.booking_date
        let da = new Date(datee).getDate()
        let daa = new Date(datee).getDay()
        days.forEach((dataa) => {
          if (dataa.number === daa) {
            let dat = { date: da, day: dataa.day, actualDate: data.booking_date }
            dates.push(dat)
          }
        })
      })
      let jsonObject = {};
      var uniqueSet = {};
      jsonObject = dates.map(JSON.stringify);
      uniqueSet = new Set(jsonObject);
      uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      console.log(uniqueArray, "hhh")
      setAppData("bookAppointment.dates", uniqueArray)
      setAppData("bookAppointment.response", apiResponse)
    }
  }
  handleNextButton = async () => {
    const { setAppData, history, phoneno, appointment_datetime, slot, specialistsName } = this.props;
    let requestBody = {
      number: phoneno ? phoneno : 7895328523,
      speciality: specialistsName,
      appointment_datetime: appointment_datetime,
      slot: slot
    }
    const apiResponse = await httpRequest({
      endPoint: `/bookAppointment`,
      method: "post",
      instance: "instanceOne",
      requestBody
    })
    if (apiResponse.doctor) {
      setAppData("spinner", true)
      let snackbar = {
        open: true,
        message: "Your Appointment is successfully booked",
        variant: "error"
      }
      setAppData("snackbar", snackbar)
      setAppData("spinner", false)
      setAppData("bookAppointment.bookAppointmentResponse", apiResponse)
      history.push("/user-home/confirm-booking")
    }
    else {
      setAppData("spinner", true)
      let snackbar = {
        open: true,
        message: apiResponse.message,
        variant: "error"
      }
      setAppData("snackbar", snackbar)
      setAppData("spinner", false)
    }
  }
  handleChange = () => {
    const { setAppData } = this.props
    setAppData("")
  }
  render() {
    const { bookAppointment, dates, setAppData,appointment_datetime, response, slot, day, selectedDateIndex, selectedSlotIndex } = this.props
    const { handleNextButton } = this
    return (
      <div style={{ background: "#f7f7f7", height: "100vh" }}>
        <div style={{ margin: "0px 15px 15px 15px" }}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="row"
            style={{ height: "13vh", marginTop: "3.5%" }}>
            <Typography align="center" color="textSecondary" style={{ margin: "5px 5px 2px 5px", fontSize: "15px", fontWeight: 500 }}>We recommend you to meet {bookAppointment && bookAppointment.doctor && bookAppointment.doctor.doctor_name} at  our Hospital</Typography>
            {"\n"}
          </Grid>
          <Card>
            <CardContent>
              <Grid style={{ display: "flex" }}>
                <Grid item xs={3}>
                  <Avatar style={{ height: "60px", width: "60px" }} />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">
                    {bookAppointment && bookAppointment.doctor && bookAppointment.doctor.doctor_name}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">
                    {bookAppointment && bookAppointment.doctor && bookAppointment.doctor.speciality}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
            <Typography variant="h6" >SELECT DATE {'&'} TIME:</Typography>
            <Typography variant="h6" color="primary" style={{ marginLeft: "7px" }}> {""}AUGUST</Typography>
          </Grid>
          <Typography align="center" color="textSecondary" variant="subtitle2" style={{ margin: "5px 0px 5px 0px" }}>Select your date</Typography>
          <Grid container>
            {dates && dates.map((data, index) => {
              return (
                <Typography align="center" style={{ margin: "3px" }}>
                  <Card style={selectedDateIndex === index ? { width: "40px", height: "60px", background: "#2FC9B9" } : { width: "40px", height: "60px" }} onClick={() => {
                    setAppData("bookAppointment.appointment_datetime", data.actualDate)
                    setAppData("bookAppointment.day", data.day)
                    setAppData("bookAppointment.selectedDateIndex", index)
                  }}>
                    {data === new Date().getDate() ?
                      <Typography style={{ fontSize: "10px" }} color="textSecondary">TODAY</Typography> : ""}
                    <Typography color="textSecondary" variant="h5">{data.date}</Typography>
                    <Typography color="textSecondary">{data.day}</Typography>
                  </Card>
                </Typography>
              )
            })}
          </Grid>
          {appointment_datetime ?
            <div>
              <Typography align="center" color="textSecondary" variant="subtitle2" style={{ margin: "5px 0px 5px 0px" }}>Select your time</Typography>
              <Grid container>
                {response && response.map((data, index) => {
                  return (
                    appointment_datetime === data.booking_date ?
                      <Typography align="center" style={{ margin: "2px 12px 2px 12px" }}>
                        <Card style={selectedSlotIndex === index ? { width: "40px", height: "45px", boxShadow: "none", background: "#2FC9B9" } :
                          { width: "40px", height: "45px", boxShadow: "none", background: "#f7f7f7" }} onClick={() => {
                            setAppData("bookAppointment.slot", data.slot)
                            setAppData("bookAppointment.selectedSlotIndex", index)
                          }}>
                          <Typography color="textSecondary" variant="h5">{data.slot}</Typography>
                          {data.slot === 9 || data.slot === 10 || data.slot === 11 ?
                            <Typography color="textSecondary">AM</Typography> : <Typography color="textSecondary">PM</Typography>}
                        </Card>
                      </Typography> : ""
                  )
                })}
              </Grid>
              {slot ?
                <Grid container>
                  <Typography align="center" variant="h6" color="textSecondary" style={{ fontWeight: 500, fontSize: "15px", margin: "3px" }}>Your appointment
                   with {bookAppointment && bookAppointment.doctor && bookAppointment.doctor.doctor_name} has been
                    scheduled on August {new Date(appointment_datetime).getDate()}, {day} at {slot}{slot === 9 || slot === 10 || slot === 11 ?
                      "AM" : "PM"}</Typography>
                </Grid> : ""}
            </div> : ""}
            {slot&&appointment_datetime&&
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
                width: "70px",
                height: "30px",
                position: "fixed",
                bottom: "62px",
                // padding: "8px",
                borderRadius: "40px",
                background: "#2FC9B9"
              }} onClick={() => handleNextButton()}
            ><Typography style={{
              display: "flex", marginTop: "7%",
              justifyContent: "center",
              color: "aliceblue"
            }}
            >NEXT</Typography>
              <Button
              ></Button>
            </Paper>
          </div>}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { bookAppointment = {}, login = {}, specialists = {} } = preparedFinalObject;
  const { dates, appointment_datetime = 0, response, actualDate, slot, day, selectedDateIndex = -1, selectedSlotIndex = -1 } = bookAppointment
  const { phoneno } = login
  const { specialistsName, doctorId } = specialists

  return {
    bookAppointment, dates, appointment_datetime, response, actualDate, slot, phoneno, login,
    specialistsName, specialists, doctorId, day, selectedDateIndex, selectedSlotIndex
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookAppointment)
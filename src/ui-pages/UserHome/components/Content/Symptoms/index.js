import React from "react";
import { Grid, Typography, Avatar, TextField, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { httpRequest } from "../../../../../ui-utils/api";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
class Symptoms extends React.Component {
  componentDidMount = () => {
    this.getSymptoms()
  }
  getSymptoms = async () => {
    const { setAppData } = this.props;
    let tempVar = []
    const apiResponse = await httpRequest({
      endPoint: `/symptomlist`,
      method: "get",
      instance: "instanceOne",
    })
    if (apiResponse) {
      tempVar = apiResponse.map((data) => {
        return {
          ...data, symptomSelected: false
        }
      })
      setAppData("symptoms.response", tempVar)
    }
  }
  checkedHandle = (key, value) => {
    const { symptoms, setAppData } = this.props
    const { response = [] } = symptoms
    let { symptomSelected } = response && response[key]
    setAppData(`symptoms.response[${key}].symptomSelected`, !symptomSelected)
    setAppData(`symptoms.name[${key}]`, value)
  }
  handleNextButton = async () => {
    
    const { setAppData } = this.props;
    setAppData("spinner", true)
    let snackbar = {
      open: true,
      message: "Please select Specialities",
      variant: "error"
    }
    setAppData("snackbar", snackbar)
    setAppData("spinner", false)
    // const {name=""}=symptoms
    // let symptomName=name.toString()
    // console.log(symptomName,"ksaksjak")
    // let requestBody={
    //   number:phoneno,
    //   symptom:symptomName,
    //   speciality:"Depression",
    //   appointment_datetime:"2020-07-25T12:08:56",
    // slot:2
    // }
    // const apiResponse = await httpRequest({
    //   endPoint: `/bookAppointment`,
    //   method: "post",
    //   instance: "instanceOne",
    //   requestBody
    // })
    // if (apiResponse) {
    //   setAppData("bookAppointment",apiResponse)
    //   history.push("/user-home/book-appointment")
    // }
  }
  render() {
    const { symptoms } = this.props
    const { checkedHandle, handleNextButton } = this
    let disableNext = false
    symptoms && Object.keys(symptoms).forEach((symptom) => {
      if (symptoms[symptom]) {
        disableNext = true
      }
    })
    return (
      <div style={{ background: "#f7f7f7", height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
        // style={{ height: "5vh" }}
        >
          <Typography variant="h6" color="textSecondary" style={{ marginTop: "20px" }}>
            Find your doctor by symptoms</Typography>
          {"\n"}
        </Grid>
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0, fontWeight: "bold" } }} />
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" style={{ fontWeight: "bold" }}>PAIN/HURT</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0 } }} />
          </Grid>
          <Grid container align="center">
            {symptoms && symptoms.response && symptoms.response.map((data, index) => {
              return (
                data.category === "My Hurts" ?
                  <Grid item xs={3} key={index} style={{ padding: "10px" }} onClick={() => checkedHandle(index, data.symptom_name)}>
                    {data.symptomSelected ?
                      <img height="20px" width="20px" src="check_circle.svg" alt="check_circle" style={{
                        position: "absolute",
                        zIndex: "1", background: "#F7F7F7", borderRadius: "50%"
                      }}></img> : ""}
                    <Avatar style={{ height: "45px", width: "45px", position: "relative" }} src={`${data.image_url}.svg`}></Avatar>
                    <Typography variant="subtitle2" style={symptoms.abdomen === true ? { color: "#2FC9B9" } : { color: "#696969" }}>{data.symptom_name}</Typography>
                  </Grid> : " "
              )
            })}
          </Grid>
        </Grid>
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0 } }} />
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" style={{ fontWeight: "bold" }}>I FEEL</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0 } }} />
          </Grid>
          <Grid container align="center"  >
            {symptoms && symptoms.response && symptoms.response.map((data, index) => {
              return (
                data.category === "I Feel" ?
                  <Grid item xs={3} key={index} style={{ padding: "10px" }} onClick={() => checkedHandle(index)}>
                    {data.symptomSelected ?
                      <img height="20px" width="20px" src="check_circle.svg" alt="check_circle" style={{
                        position: "absolute", zIndex: "1",
                        background: "white", borderRadius: "50%"
                      }}></img> : ""}
                    <Avatar src={`${data.image_url}.svg`} style={{ height: "45px", width: "45px" }} ></Avatar>
                    <Typography variant="subtitle2" style={symptoms.chills === true ? { color: "#2FC9B9" } : { color: "#696969" }}>{data.symptom_name}</Typography>
                  </Grid> : " "
              )
            })}
          </Grid>
        </Grid>
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0 } }} />
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" style={{ fontWeight: "bold" }}>I CAN'T</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth InputProps={{ readOnly: true, style: { fontSize: 0 } }} />
          </Grid>
          <Grid container align="center"  >
            {symptoms && symptoms.response && symptoms.response.map((data, index) => {
              return (
                data.category === "I Can't" ?
                  <Grid item xs={3} key={index} style={{ padding: "10px" }} onClick={() => checkedHandle(index)}>
                    {data.symptomSelected ?
                      <img height="20px" width="20px" src="check_circle.svg" alt="check_circle" style={{
                        position: "absolute", zIndex: "1",
                        background: "white", borderRadius: "50%"
                      }}></img> : ""}
                    <Avatar src={`${data.image_url}.svg`} style={{ height: "45px", width: "45px" }} ></Avatar>
                    <Typography variant="subtitle2" style={symptoms.chills === true ? { color: "#2FC9B9" } : { color: "#696969" }}>{data.symptom_name}</Typography>
                  </Grid> : " "
              )
            })}
          </Grid>
        </Grid>
        {disableNext ?
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
              {/* <Button disabled={disableNext ? false : true}
                ></Button> */}
            </Paper>
          </div> :
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
                background: "grey"
              }}
            ><Typography style={{
              display: "flex", marginTop: "7%",
              justifyContent: "center",
              color: "aliceblue"
            }}
            >NEXT</Typography>
              {/* <Button disabled={disableNext ? false : true}
               ></Button> */}
            </Paper>
          </div>
        }
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { symptoms = {}, login = {} } = preparedFinalObject;
  const { phoneno } = login

  return { symptoms, phoneno, login }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Symptoms)
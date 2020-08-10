import React from "react";
import { Card, Grid, CardContent, Typography, Avatar, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { httpRequest } from "../../../../../ui-utils/api";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
class Symptoms extends React.Component {
  componentDidMount=()=>{
    const {setAppData,symptoms}=this.props
    setAppData("symptoms",{...symptoms,abdomen:false,back:false,chest:false,ear:false,head:false,piles:false,
      tooth:false,chills:false,fever:false,lightHeaded:false,feve:false})
  }
  checkedHandle=(key,value)=>{
    const {symptoms,setAppData}=this.props
    setAppData(key,value)
  }
  render() {
    const { history,symptoms } = this.props
    const {checkedHandle}=this
    return (
      <div style={{ background: "#eeeeee", height: "100vh" }}>
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
          <Grid container align="center"  >
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.abdomen",!symptoms.abdomen)}>
              {symptoms.abdomen===true?
              <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",
              zIndex:"1",background:"#F7F7F7",borderRadius: "50%"}}></img>:""}
              <Avatar style={{ height: "45px", width: "45px",position: "relative"  }} src="ic_eight.svg"></Avatar>
              <Typography>ABDOMEN</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.back",!symptoms.back)}>
              {symptoms.back===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}

              <Avatar style={{ height: "45px", width: "45px" }} src="ic_eight.svg" ></Avatar>
              <Typography>BACK</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.chest",!symptoms.chest)}>
              {symptoms.chest===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}

              <Avatar style={{ height: "45px", width: "45px" }}  src="ic_three.svg" ></Avatar>
              <Typography>CHEST</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.ear",!symptoms.ear)}>
              {symptoms.ear===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}

              <Avatar style={{ height: "45px", width: "45px" }} src="ic_add_square_o.svg"></Avatar>
              <Typography>EAR</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.head",!symptoms.head)}>
              {symptoms.head===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}

              <Avatar style={{ height: "45px", width: "45px" }} src="ic_add_square_o.svg"></Avatar>
              <Typography>HEAD</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.piles",!symptoms.piles)}>
              {symptoms.piles===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}

              <Avatar style={{ height: "45px", width: "45px" }} src="ic_eleven.svg"></Avatar>
              <Typography>PILES</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.tooth",!symptoms.tooth)}>
              {symptoms.tooth===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}
              <Avatar style={{ height: "45px", width: "45px" }} src="ic_add_square_o.svg"></Avatar>
              <Typography>TOOTH</Typography>
            </Grid>
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
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.chills",!symptoms.chills)}>
              {symptoms.chills===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}
              <Avatar src="ic_add_square_o.svg" style={{ height: "45px", width: "45px" }} ></Avatar>
              <Typography>CHILLS</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.fever",!symptoms.fever)}>
              {symptoms.fever===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}
              <Avatar src="ic_add_square_o.svg" style={{ height: "45px", width: "45px" }} ></Avatar>
              <Typography>FEVER</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.lightHeaded",!symptoms.lightHeaded)}>
              {symptoms.lightHeaded===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}
              <Avatar src="ic_add_square_o.svg" style={{ height: "45px", width: "45px" }} ></Avatar>
              <Typography>LIGHT-HEADED</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: "10px" }} onClick={()=>checkedHandle("symptoms.feve",!symptoms.feve)}>
              {symptoms.feve===true?
            <img height ="20px" width="20px" src="check_circle.svg" style={{ position: "absolute",zIndex:"1",
            background:"white",borderRadius: "50%"}}></img>:""}
              <Avatar src="ic_add_square_o.svg" style={{ height: "45px", width: "45px" }} ></Avatar>
              <Typography>FEVER</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { symptoms = {} } = preparedFinalObject;
  return { symptoms}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Symptoms)
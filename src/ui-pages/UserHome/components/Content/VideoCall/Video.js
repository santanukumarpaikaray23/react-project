import React, { Component } from 'react';
import Room from './Room';
import Video from 'twilio-video';
import { httpRequest } from "../../../../../ui-utils/api"
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import {Typography,Grid,Avatar,Card,CardContent,AppBar} from "@material-ui/core";

class VideoChat extends Component {

     componentDidMount = async () => {
         
        const { setAppData, appointment } = this.props
        console.log(appointment);
        setAppData("spinner", true)
        const apiResponse = await httpRequest({
            endPoint: `/connectVedio/${appointment.appointment_id}`,
            method: "get",
            instance: "instanceOne",
        })
        if(apiResponse && apiResponse.ChannelId){
        let doctorToken = apiResponse ? apiResponse.doctorAccessToken : "Api Error"
        console.log("doctorAccessToken", doctorToken);
        setAppData("VideoChat", apiResponse)
        const { doctorAccessToken, patientAccessToken, ChannelId } = apiResponse;
        setAppData("token", `${patientAccessToken}`);
        setAppData("roomName", `${ChannelId}`);
        setAppData("doctorAccessToken",doctorAccessToken);
        setAppData("spinner", false)
        }else{
            let snackbar={
                open: true,
                message:"Error",
                variant:"error"
            }
            setAppData("snackbar",snackbar)
        }
    }

    handleLogout = () => {
        const { token, roomName } = this.props;
        Video.connect(`${token}`, { name: roomName }).then((room) => {

            room.localParticipant.audioTracks.forEach((publication) => {
                publication.track.disable();
            });

            room.localParticipant.videoTracks.forEach((publication) => {
                publication.track.disable();
            });

            room.localParticipant.videoTracks.forEach((publication) => {
                publication.track.stop();
                publication.unpublish();
            });
        });
    }


    muteAudio = () => {
        
        const {token, roomName } = this.props;
        Video.connect(`${token}`, { name: roomName }).then((room) => {
            // room.localParticipant.audioTracks.forEach((publication) => {
            //     publication.track.disable();
            // });
            // room.localParticipant.videoTracks.forEach((publication) => {
            //     publication.track.enable();
            // });
           
           
            // room.localParticipant.audioTracks.forEach(function (audioTrack) {
            //     console.log("audioTrack-- "+audioTrack);
            //     audioTrack.disable();
            //   });
              room.localParticipant.audioTracks.forEach(function(track) {
                console.log("audioTrack-- "+track);
                track.track.disable();
              })
              //microphone = false;
        });
    }
    render() {
        const { handleLogout, muteAudio } = this;
        const { token, roomName, appointment } = this.props;

        return (
            <div>
            <div style={{marginTop: "10px",position:"fixed", minHeight :"80vh"}}>
          <Card style={{ width:"100%", boxShadow: "none", background:"transparent", overflow: "hidden"}}>
             <CardContent>
              <Grid style={{ display: "flex"}}>
                  <Grid item xs={3}>
                      <Avatar />
                  </Grid>
                <Grid item md={9}>
        <Typography variant="h6" >{appointment.doctor_name}</Typography>
                      <Typography color="textSecondary" variant="subtitle2">
                            {appointment.Doctor_speciality} 
                      </Typography>
                </Grid>
                </Grid>
                  {/* <Typography color="textSecondary" variant="subtitle2">Answers on chat time</Typography> */}
              </CardContent>
         </Card>
         <Room roomName={roomName}
                token={token}
                handleLogout={handleLogout}
                //muteAudio={muteAudio}
                />
    </div>
    </div>
        )
    }
}

const mapStateToProps = ({ screenConfiguration }) => {
    const { preparedFinalObject = {} } = screenConfiguration;
    const { apiResponse={}, token, roomName,doctorAccessToken, generateToken={}} = preparedFinalObject;
    const { appointment } = generateToken
    return { apiResponse,doctorAccessToken,token, roomName, appointment,generateToken}
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(VideoChat);

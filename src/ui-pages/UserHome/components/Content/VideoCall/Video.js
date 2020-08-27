import React, { Component } from 'react';
import Room from './Room';
import Video from 'twilio-video';
import { httpRequest } from "../../../../../ui-utils/api"
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../../../ui-utils/commons";

class VideoChat extends Component {

     componentDidMount = async () => {
        const { setAppData } = this.props
        setAppData("spinner", true)
        const apiResponse = await httpRequest({
            endPoint: `/connectVedio/e629552a-e8ca-4526-96e5-ae0d47e30b83`,
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
            room.localParticipant.audioTracks.forEach((publication) => {
                publication.track.disable();
            });
            room.localParticipant.videoTracks.forEach((publication) => {
                publication.track.enable();
            });
        });
    }
    render() {
        const { handleLogout, muteAudio } = this;
        const { setAppData, apiResponse = {} } = this.props;
        const { doctorAccessToken, token, roomName } = this.props;



        return (
            <Room roomName={roomName}
                token={token}
                handleLogout={handleLogout}
                muteAudio={muteAudio} />
        )
    }
}

const mapStateToProps = ({ screenConfiguration }) => {
    const { preparedFinalObject = {} } = screenConfiguration;
    const { apiResponse={}, token, roomName,doctorAccessToken} = preparedFinalObject;
   
    return { apiResponse,doctorAccessToken,token, roomName}
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(VideoChat);

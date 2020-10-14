import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import VideocamOffOutlinedIcon from '@material-ui/icons/VideocamOffOutlined';
import Participant from './Participant';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Room = ({ token, roomName, handleLogout, muteAudio }) => {
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const participantConnected = participant => {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        };

        const participantDisconnected = participant => {
            setParticipants(prevParticipants =>
                prevParticipants.filter(p => p !== participant)
            );
        };

        Video.connect(`${token}`, {
            name: roomName,
            audio: true,
            video: { width: 100, height: 100 }
        }).then(room => {
            setRoom(room);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.participants.forEach(participantConnected);
        });

        return () => {
            setRoom(currentRoom => {
                if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
                        trackPublication.track.stop();
                    });
                    currentRoom.disconnect();
                    return null;
                } else {
                    return currentRoom;
                }
            });
        };
    }, [roomName, token]);

    let remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant}/>
    ));

    remoteParticipants = remoteParticipants.length > 1 ? remoteParticipants.pop() : remoteParticipants



    return (
   
    <span>
        <span className="room">
        {/* <button onClick={handleLogout}><VideocamOffOutlinedIcon color="red"/></button> */}
            <span   >
            <div class="relative">
                {remoteParticipants}
                <div class="absolute1">
                {room ? (
                    <Participant
                        participant={room.localParticipant}
                    />
                ) : (
                        ''
                    )}
                </div>
            <div class="absolute2">
                <Grid style={{display : "flex", flexDirection : "coloumn"}}>
                <Grid item xs={2}>
                <img src="ic_video_off.svg" width="50%"></img>
                </Grid>
                <Grid item xs={2}>
                    <img src="ic_video_off.svg" width="50%" ></img>
                </Grid>
                <Grid item xs={2}>
                    <img src="ic_video_off.svg" width="50%" ></img>
                </Grid>
                </Grid>
            </div>
            </div>
            </span>
        </span>
    </span>

     // <span>
       
    //     <span className="room">
    //     <button onClick={handleLogout}><VideocamOffOutlinedIcon color="red"/></button>
    //         <div className="local-participant">
    //             {room ? (
    //                 <Participant
    //                     key={room.localParticipant.sid}
    //                     participant={room.localParticipant}
    //                 />
    //             ) : (
    //                     ''
    //                 )}
    //                  {/* <br></br>
    //                 <button onClick={muteAudio}>Mute</button> */}
    //         </div>
    //         <span className="remote-participants">{remoteParticipants}</span>
    //     </span>

    // </span>
    );
};

export default Room;

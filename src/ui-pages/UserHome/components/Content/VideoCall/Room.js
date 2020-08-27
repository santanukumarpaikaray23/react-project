import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import VideocamOffOutlinedIcon from '@material-ui/icons/VideocamOffOutlined';
import Participant from './Participant';
import './index.css';

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
        <Participant key={participant.sid} participant={participant} />
    ));

    remoteParticipants = remoteParticipants.length > 1 ? remoteParticipants.pop() : remoteParticipants



    return (<span>
       
        <span className="room">
        <button onClick={handleLogout}><VideocamOffOutlinedIcon color="red"/></button>
            <div className="local-participant">
                {room ? (
                    <Participant
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                    />
                ) : (
                        ''
                    )}
            </div>
            <span className="remote-participants">{remoteParticipants}</span>
        </span>

    </span>
    );
};

export default Room;

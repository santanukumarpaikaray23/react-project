import React from 'react';
import Room from './Room';
import Video from 'twilio-video';

const VideoChat = () => {
const roomName="7888683799-8447594602";
const token="eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTS2U1ZmIzM2Q5N2ZkZmY1YTg5ZjUwMDFiMWRlMTE4ODZmIiwiZXhwIjoxNTk4NDQyODE2LCJncmFudHMiOnsiaWRlbnRpdHkiOiJQYXRpZW50IiwidmlkZW8iOnsicm9vbSI6Ijc4ODg2ODM3OTktODQ0NzU5NDYwMiJ9fSwianRpIjoiU0tlNWZiMzNkOTdmZGZmNWE4OWY1MDAxYjFkZTExODg2Zi0xNTk4NDM5MTY4Iiwic3ViIjoiQUNlYWJkYzQxY2U0ZGI3ZmIxOThhYmQ1ZmE0YzhjZDY3MyJ9.MGHBm4VW71y1SvFq1uv-y75-PIsFFK4FIlb7zg_C2mM"

const handleLogout=()=>{
  Video.connect(token, { name: roomName }).then((room) => {

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


const muteAudio=()=>{
  Video.connect(token, { name: roomName }).then((room) => {
    room.localParticipant.audioTracks.forEach((publication) => {
      publication.track.disable();
    });
    room.localParticipant.videoTracks.forEach((publication) => {
      publication.track.enable();
    });
  });
}
  let render;
  return render =  <Room roomName={roomName}
   token={token}
   handleLogout={handleLogout} 
   muteAudio={muteAudio}/>;
};

export default VideoChat;

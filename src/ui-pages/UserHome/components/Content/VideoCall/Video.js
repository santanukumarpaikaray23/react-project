import React,{Component} from 'react';
import Room from './Room';
import Video from 'twilio-video';


class VideoChat extends Component{


    render(){
        
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
  

        return(
            <Room roomName={roomName}
   token={token}
   handleLogout={handleLogout} 
   muteAudio={muteAudio}/>
        )
    }
}

// const VideoChat = () => {
// const roomName="7888683799-8447594602";
// const token="eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTS2U1ZmIzM2Q5N2ZkZmY1YTg5ZjUwMDFiMWRlMTE4ODZmIiwiZXhwIjoxNTk4NDM5MjkwLCJncmFudHMiOnsiaWRlbnRpdHkiOiJQYXRpZW50IiwidmlkZW8iOnsicm9vbSI6Ijc4ODg2ODM3OTktODQ0NzU5NDYwMiJ9fSwianRpIjoiU0tlNWZiMzNkOTdmZGZmNWE4OWY1MDAxYjFkZTExODg2Zi0xNTk4NDM1NzEyIiwic3ViIjoiQUNlYWJkYzQxY2U0ZGI3ZmIxOThhYmQ1ZmE0YzhjZDY3MyJ9.DyFXWJeHb3FEuDQEz2I6JWiP6q-o7XFW-LDgFjZ_oZA"

// const handleLogout=()=>{
//   Video.connect(token, { name: roomName }).then((room) => {

//     room.localParticipant.audioTracks.forEach((publication) => {
//       publication.track.disable();
//     });

//     room.localParticipant.videoTracks.forEach((publication) => {
//       publication.track.disable();
//     });

//     room.localParticipant.videoTracks.forEach((publication) => {
//       publication.track.stop();
//       publication.unpublish();
//     });
//   });
// }


// const muteAudio=()=>{
//   Video.connect(token, { name: roomName }).then((room) => {
//     room.localParticipant.audioTracks.forEach((publication) => {
//       publication.track.disable();
//     });
//     room.localParticipant.videoTracks.forEach((publication) => {
//       publication.track.enable();
//     });
//   });
// }
//   let render;
//   return render =  <Room roomName={roomName}
//    token={token}
//    handleLogout={handleLogout} 
//    muteAudio={muteAudio}/>;
// };

export default VideoChat;

import React, { Component } from 'react'
import MessageForm from '../MessageFrom'
import MessageList from '../MessageList'
import TwilioChat from 'twilio-chat'
import { httpRequest } from "../../../../../ui-utils/api"
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import { connect } from "react-redux";
import {Typography,Grid,Avatar,Card,CardContent} from "@material-ui/core";
import '../MessageList.css';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      username: null,
      channel: null,
    }
    this.messagesLoaded = this.messagesLoaded.bind(this);
   // this.messageAdded = this.messageAdded.bind(this);
  }

  componentDidMount = () => {
    
    this.getToken()
      .then(this.createChatClient)
      .then(this.joinGeneralChannel)
      .then(this.configureChannelEvents)
      .catch((error) => {
        this.addMessage({ body: `Error: ${error.message}` })
      })
  }
  componentDidUpdate = () => {
    this.node.scrollTop = this.node.scrollHeight
  }
  getToken = async() => {
    const { setAppData,appointment } = this.props;
    console.log(appointment);
    const chatRes = await httpRequest({
      endPoint: `/patientConnectChat/${appointment.twilioChatChannelId}/${appointment.patient_id}`,
      method: "get",
      instance: "instanceOne",
    })
    setAppData("chatdet",chatRes)
    return chatRes;
  }

  createChatClient = (res) => {
    return new Promise((resolve, reject) => {
      resolve(new TwilioChat(res.patientChatAccessToken))
    })
  }

  joinGeneralChannel = (chatClient) => {
    const {appointment} = this.props
    console.log(appointment.twilioChatChannelId);
    return new Promise((resolve, reject) => {
      chatClient.getSubscribedChannels().then(() => {
        chatClient.getChannelByUniqueName(appointment.twilioChatChannelId).then((channel) => {
          this.setState({ channel })
          this.channel = channel
          channel.join().then(() => {
            window.addEventListener('beforeunload', () => channel.leave())
          }).catch(() => reject(Error('Could not Join')))
          
          resolve(channel)
        })
        .then(() =>{
          this.channel.getMessages().then(this.messagesLoaded);
          //this.channel.on('messageAdded', this.messageAdded);
          })
        .catch(() => this.createGeneralChannel(chatClient))
      })
      .catch(() => reject(Error('Could not chat!.')))
    })
  }

  createGeneralChannel = (chatClient) => {
    return new Promise((resolve, reject) => {
      chatClient
        .createChannel({ uniqueName: 'general', friendlyName: 'General Chat' })
        .then(() => this.joinGeneralChannel(chatClient))
        .catch(() => reject(Error('Could not create.')))
    })
  }

  addMessage = (message) => {
    
    const { appointment } = this.props;
    const messageData = { ...message, me: message.author === appointment.patient_id, text: message.body }
    this.setState({
      messages: [...this.state.messages, messageData],
    })
  }




  messagesLoaded(messagePage) {
    // this.setState({
    //   messages: messagePage.items.map(this.addMessage)
    // });
    messagePage.items.map(this.addMessage)
  }



  
  handleNewMessage = (text) => {
    if (this.state.channel) {
      this.state.channel.sendMessage(text)
    }
  }

  configureChannelEvents = (channel) => {
    channel.on('messageAdded', ({ author, body }) => {
      this.addMessage({ author, body })
    })

    channel.on('memberJoined', (member) => {
      this.addMessage({ body: `${member.identity} has joined.` })
    })

    channel.on('memberLeft', (member) => {
      this.addMessage({ body: `${member.identity} has left.` })
    })
  }

  render() {
    const { appointment } = this.props;
    return (
      // <div className="content">
      //   <div style={{marginTop: "3.5%" }}></div>
      // <div className="upper">
      //   <MessageList messages={this.state.messages} />
      //  </div>
      //  <div className="bottom">
      //   <MessageForm onMessageSend={this.handleNewMessage} />
      //   </div>
      // </div>width:"96%",marginLeft:"2%"
      <div class="flex-container" ref={(node) => (this.node = node)}>
            <div class="flex-item-left">
            <Card style={{width:"100%",background:"#f7f7f7",boxShadow:"none" }}>
             <CardContent>
              <Grid style={{ display: "flex"}}>
                  <Grid item xs={3}>
                      <Avatar />
                  </Grid>
                <Grid item md={9}>
                      <Typography variant="h6" >{appointment.doctorName}</Typography>
                      <Typography color="textSecondary" variant="subtitle2">
                            {appointment.doctorSpeciality}
                      </Typography>
                </Grid>
                </Grid>
                  {/* <Typography color="textSecondary" variant="subtitle2">Answers on chat time {getTime(dData.appointmentDate)}</Typography> */}
              </CardContent>
         </Card>
            </div>
            <div style={{marginLeft:"2%",marginRight:"2%"}} >
            <MessageList messages={this.state.messages}></MessageList>
            </div>
            <div class="flex-item-right" style={{width:"96%", marginLeft:"2%",position: "fixed",bottom: "11%"}}>
            <MessageForm onMessageSend={this.handleNewMessage} />
            </div>
      </div>
    )
  }
}

const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { chatdet ,chatToken ={} } = preparedFinalObject;
  const { appointment } = chatToken;
  return { chatdet, chatToken, appointment } 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
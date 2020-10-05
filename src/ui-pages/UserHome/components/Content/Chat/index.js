import React, { Component } from 'react'
import MessageForm from '../MessageFrom'
import MessageList from '../MessageList'
import TwilioChat from 'twilio-chat'
import { httpRequest } from "../../../../../ui-utils/api"
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import { connect } from "react-redux";
import {Typography,Grid,Avatar,Card,CardContent,AppBar} from "@material-ui/core"

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      username: null,
      channel: null,
    }
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
  getToken = async() => {
    const { setAppData,appointment } = this.props;
    console.log(appointment);
    const chatRes = await httpRequest({
      endPoint: `/connectChat/${appointment.appointment_id}`,
      method: "get",
      instance: "instanceOne",
    })
    setAppData("chatdet",chatRes)
    return chatRes;
  }

  createChatClient = (res) => {
    return new Promise((resolve, reject) => {
      resolve(new TwilioChat(res.patient_chat_access_token))
    })
  }

  joinGeneralChannel = (chatClient) => {
    
    const {chatdet} = this.props
    console.log(chatdet.ChannelId);
    return new Promise((resolve, reject) => {
      chatClient.getSubscribedChannels().then(() => {
        chatClient.getChannelByUniqueName(chatdet.ChannelId).then((channel) => {
          this.setState({ channel })

          channel.join().then(() => {
            window.addEventListener('beforeunload', () => channel.leave())
          }).catch(() => reject(Error('Could not Join')))

          resolve(channel)
        }).catch(() => this.createGeneralChannel(chatClient))
      }).catch(() => reject(Error('Could not get channel list.')))
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
    const messageData = { ...message, me: message.author === appointment.patient_id }
    this.setState({
      messages: [...this.state.messages, messageData],
    })
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
      // </div>
      <div class="flex-container" style={{padding:"2px"}}>
            <div class="flex-item-left">
            <Card style={{ width:"96%",marginLeft:"2%"}}>
             <CardContent>
              <Grid style={{ display: "flex"}}>
                  <Grid item xs={3}>
                      <Avatar />
                  </Grid>
                <Grid item md={9}>
                      <Typography variant="h6" >{appointment.doctor_name}</Typography>
                      <Typography color="textSecondary" variant="subtitle2">
                            {/* {dData.doctor_speciality} */} {appointment.doctor_speciality}
                      </Typography>
                </Grid>
                </Grid>
                  {/* <Typography color="textSecondary" variant="subtitle2">Answers on chat time</Typography> */}
              </CardContent>
         </Card>
            </div>
            <div class="flex-it em-right" style={{marginLeft:"2%",marginRight:"2%"}} >
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
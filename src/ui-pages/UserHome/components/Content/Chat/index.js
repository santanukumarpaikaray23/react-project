import React, { Component } from 'react'
import MessageForm from '../MessageFrom'
import MessageList from '../MessageList'
import TwilioChat from 'twilio-chat'
import { httpRequest } from "../../../../../ui-utils/api"
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import { connect } from "react-redux";

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
    const messageData = { ...message, me: message.author === this.state.username }
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
    return (
      <div className="content">
        <div style={{marginTop: "3.5%" }}></div>
      <div className="upper">
        <MessageList messages={this.state.messages} />
       </div>
       <div className="bottom">
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
import React, { Component } from 'react'
import MessageForm from '../MessageFrom'
import MessageList from '../MessageList'
import TwilioChat from 'twilio-chat'
import { httpRequest } from "../../../../../ui-utils/api"
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import { connect } from "react-redux";
// import SendBird from "sendbird"

// import axios from "axios"
// import './App.css'

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
    const { setAppData } = this.props;
    const chatRes = await httpRequest({
      endPoint: `/updateChatToken/52f28b13-4477-40f2-a566-d596eb529fb0`,
      method: "get",
      instance: "instanceOne",
    })
    setAppData("token",chatRes.patientAccessToken)
    return chatRes;
  }

  createChatClient = (res) => {
    return new Promise((resolve, reject) => {
      resolve(new TwilioChat(res.patientAccessToken))
    })
  }

  joinGeneralChannel = (chatClient) => {
    return new Promise((resolve, reject) => {
      chatClient.getSubscribedChannels().then(() => {
        chatClient.getChannelByUniqueName('CH327a32f165c14b5d9f6e03f1f7ddfd63').then((channel) => {
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
  const { Chat = {} } = preparedFinalObject;
  return { Chat } 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
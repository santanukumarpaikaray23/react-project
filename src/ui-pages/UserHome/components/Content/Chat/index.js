import React, { Component } from 'react'
import MessageForm from '../MessageFrom'
import MessageList from '../MessageList'
import TwilioChat from 'twilio-chat'
import { httpRequest } from "../../../../../ui-utils/api"
import { mapDispatchToProps } from "../../../../../ui-utils/commons";
import $ from 'jquery'
import { connect } from "react-redux";

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
      .then(this.getChannel)
      .then(this.configureChannelEvents)
      .catch((error) => {
        this.addMessage({ body: `Error: ${error.message}` })
      })
  }

  getToken = async() => {
    debugger
    const { setAppData, history, checked, phoneno } = this.props;
    // return new Promise((resolve, reject) => {

    const apiResponse = await httpRequest({
      endPoint: `/getChatToken/52`,
      method: "get",
      instance: "instanceOne",
    })
    setAppData("token",apiResponse)
return apiResponse
  // })
    // return new Promise((resolve, reject) => {
    //   this.addMessage({ body: 'Connecting...' })

    //   $.getJSON('/token', (token) => {
    //     this.setState({ username: token.identity })
    //     resolve(token)
    //   }).fail(() => {
    //     reject(Error('Failed to connect.'))
    //   })
    // })
  }

  createChatClient = (token) => {
    debugger
    return new Promise((resolve, reject) => {
      resolve(new TwilioChat(token))
      let aa= new TwilioChat(token)
      console.log(aa,"aa")
    })
  }

  getChannel=async(chatClient)=>{
    debugger
    const { setAppData, history, checked, phoneno } = this.props;
    let requestBody={
      appointmentId: 59,
  doctorId: 47,
  patientId: 57
}
    const apiResponse = await httpRequest({
      endPoint: `/createChannel`,
      method: "post",
      instance: "instanceOne",
      requestBody
    })
    let channel=apiResponse
    channel.url.join.
      this.addMessage({ body: `Joined general channel as ${this.state.username}` })
      window.addEventListener('beforeunload', () => channel.leave())
    

  }

  joinGeneralChannel = (chatClient) => {
    debugger
    return new Promise((resolve, reject) => {
      chatClient.getSubscribedChannels().then(() => {
        console.log("kkkkkkkk")
        chatClient.getChannelByUniqueName('general').then((channel) => {
          console.log(channel,"channel")
          this.addMessage({ body: 'Joining general channel...' })
          this.setState({ channel })

          channel.join().then(() => {
            this.addMessage({ body: `Joined general channel as ${this.state.username}` })
            window.addEventListener('beforeunload', () => channel.leave())
          }).catch(() => reject(Error('Could not join general channel.')))

          resolve(channel)
        }).catch(() => this.createGeneralChannel(chatClient))
      }).catch(() => reject(Error('Could not get channel list.')))
    })
  }

  createGeneralChannel = (chatClient) => {
    debugger
    return new Promise((resolve, reject) => {
      this.addMessage({ body: 'Creating general channel...' })
      chatClient
        .createChannel({ uniqueName: 'general', friendlyName: 'General Chat' })
        .then(() => this.joinGeneralChannel(chatClient))
        .catch(() => reject(Error('Could not create general channel.')))
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
      this.addMessage({ body: `${member.identity} has joined the channel.` })
    })

    channel.on('memberLeft', (member) => {
      this.addMessage({ body: `${member.identity} has left the channel.` })
    })
  }

  render() {
    return (
      <div className="App">
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    )
  }
}

const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { Chat = {} } = preparedFinalObject;
  return { Chat}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
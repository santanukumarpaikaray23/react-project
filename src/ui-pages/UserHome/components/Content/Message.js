import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames"
import './Message.css'

class Message extends Component {
  static propTypes = {
    author: PropTypes.string,
    body: PropTypes.string.isRequired,
    me: PropTypes.bool,
  }


  renderMessage(message) {
    
    const {me, body} = message;
    //const {currentMember} = this.props;
    // const messageFromMe = member.id === currentMember.id;
    // console.log(currentMember)
    const className = me ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
        <div className="Message-content">
          <div className="username">
          </div>
          <div className="text">{body}</div>
        </div>
      </li>
    );
  }

  render() {
    //const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {/* {this.props.map(m => this.renderMessage(m))} */}
        {this.renderMessage(this.props)}
      </ul>
);

    }

//     author: "a1faccfd-3717-4369-9ffa-734c81a11da9"
// body: "ffff"
// me: true
  // render() {
  //   const classes = classNames('Message', {
  //     log: !this.props.author,
  //     me: this.props.me
  //   })

  //   return (
  //     <div className={classes}>
  //       {this.props.author && (
  //         <span className="author"></span>//{this.props.author}:
  //       )}
  //       {this.props.body}
  //     </div>
  //   )
  // }
}

export default Message

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MessageForm.css'
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button, Grid, Typography, TextField, Card, ThemeProvider, createMuiTheme, Switch, withStyles } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: "0px",
          padding: "0px"
        },
        '&:before': {
          borderBottom: '0px',
          padding: "0px"
        },
      },
    },
  }
});

class MessageForm extends Component {
  static propTypes = {
    onMessageSend: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    //this.input.focus()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    if(this.cText.value != ''){
    this.props.onMessageSend(this.cText.value)
    this.cText.value = ""
    }
  }

  render() {
    return (
      // <form className="MessageForm" onSubmit={this.handleFormSubmit}>
      //   <div className="input-container">
      //     <input
      //       type="text"
      //       ref={(node) => (this.input = node)} 
      //       placeholder="Enter your message..."
      //     />
      //   </div>
      //   <div className="button-container">
      //     <button type="submit">
      //       Send
      //     </button>
      //   </div>
      // </form>
      <div className="input-send">
      <form onSubmit={this.handleFormSubmit}>
        <div class="inputmsg">
            <ThemeProvider theme={theme}>
              <TextField 
               fullWidth 
               placeholder="send Message"
               inputRef={el => this.cText = el}
               InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                   <IconButton type="submit"> <SendIcon/> </IconButton>
                  </InputAdornment>
                ),
              }}
              />
            </ThemeProvider >
            </div>
      </form> 
      </div>
    )
  }
}

export default MessageForm

import React from 'react';
import { Message } from 'semantic-ui-react';

function MessagePopup({msg}){
  const msgMap = {
    'red':<Message color='red'>{msg.msg}</Message>,
    'green':<Message color='green'>{msg.msg}</Message>,
    'teal': <Message color='teal'>{msg.msg}</Message>
  }
  return msgMap[msg.color];
}

export default MessagePopup;

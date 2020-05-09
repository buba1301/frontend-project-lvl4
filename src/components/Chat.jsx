import React from 'react';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput';

const Chat = () => (
  <div className="col h-100">
    <div className="d-flex flex-column h-100">
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        <Messages />
      </div>
      <div className="mt-auto">
        <MessageInput />
      </div>
    </div>
  </div>
);

export default Chat;

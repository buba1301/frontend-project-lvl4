import React from 'react';
import { useSelector } from 'react-redux';


const renderMessage = (messages, activeChannel) => {
  if (messages.length === 0) {
    return null;
  }

  const activeMessages = messages.filter(({ channelId }) => channelId === activeChannel);

  return activeMessages.map((message) => {
    console.log('MESSEGES', message);
    const { userName, text, id } = message;
    console.log('MESSEGES', userName);
    return (
      <div key={id}>
        <b>{userName}</b>
        {':'}
        {text}
      </div>
    );
  });
};

const Messages = () => {
  const { messages, activeChannel } = useSelector((state) => state);

  return renderMessage(messages, activeChannel);
};

export default Messages;

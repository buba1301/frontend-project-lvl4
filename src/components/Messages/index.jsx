import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectActiveMassages = createSelector(
  (state) => state.messages,
  (state) => state.activeChannel,
  (messages, activeChannel) => messages.filter(({ channelId }) => channelId === activeChannel),
);

const Messages = () => {
  const activeMessages = useSelector((state) => selectActiveMassages(state));

  if (activeMessages.length === 0) {
    return null;
  }

  return activeMessages.map((message) => {
    const { userName, text, id } = message;

    return (
      <div key={id}>
        <b>{userName}</b>
        {':'}
        {text}
      </div>
    );
  });
};

export default Messages;

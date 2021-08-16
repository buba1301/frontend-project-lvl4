import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Messages from '../Messages';
import MessageInput from '../MessegeInput';

const renderChatHeader = (removable, id, onClick) => {
  if (!removable) {
    return null;
  }
  return (
    <ButtonGroup>
      <Button variant="outline-dark" onClick={onClick('renaming', id)}>
        Rename
      </Button>
      <Button variant="outline-dark" onClick={onClick('removing', id)}>
        Remove
      </Button>
    </ButtonGroup>
  );
};

const Chat = ({ handleModal }) => {
  const channels = useSelector((state) => state.channels);
  const activeChannel = useSelector((state) => state.activeChannel);

  const currentChannel = channels.find(({ id }) => id === activeChannel);

  const { name, removable, id } = currentChannel;

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light border-bottom py-3 pl-3 d-flex">
          <strong className="lead py-1 d-flex flex-fill text-break">{name}</strong>
          {renderChatHeader(removable, id, handleModal)}
        </div>
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          <Messages />
        </div>
        <div className="mt-auto">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default Chat;

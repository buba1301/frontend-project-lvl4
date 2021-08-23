/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';

const UserInfo = () => {
  const users = useSelector((state) => state.users);
  const channels = useSelector((state) => state.channels);
  const activeChannel = useSelector((state) => state.activeChannel);

  const channelName = channels.find(({ id }) => id === activeChannel).name;

  return (
    <div className="user-info">
      <div className="name">{channelName}</div>
      <div className="status">
        <span className="circle" />
        {`${users.length} участников`}
      </div>
    </div>
  );
};

export default UserInfo;

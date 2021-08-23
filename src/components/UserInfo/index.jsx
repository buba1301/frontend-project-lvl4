/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { activeChannel } from '../../slices/ActiveChannel';
import './styles.css';

const selectActiveUsers = createSelector(
  (state) => state.users,
  (state) => state.activeChannel,
  (users, activeChannel) => users.filter(({ channelId }) => channelId === activeChannel),
);

const selectChannelName = createSelector(
  (state) => state.channels,
  (state) => state.activeChannel,
  (channels, activeChannel) => channels.find(({ id }) => id === activeChannel).name,
);

const UserInfo = () => {
  const users = useSelector((state) => selectActiveUsers(state));
  const channelName = useSelector((state) => selectChannelName(state));
  console.log('channelName', channelName);

  console.log('UserInfo', users.length);

  const usersCount = users.length;

  const activeChannel = useSelector((state) => state.activeChannel);

  return (
    <div className="user-info">
      <div className="name">{channelName}</div>
      <div className="status">
        <span className="circle" />
        {`${usersCount} участников`}
      </div>
    </div>
  );
};

export default UserInfo;

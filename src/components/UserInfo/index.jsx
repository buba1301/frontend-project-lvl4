/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
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

  const usersCount = users.length;

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

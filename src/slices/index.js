import { combineReducers } from 'redux';
import { users, usersActions, addUser } from './Users';
import { channels, channelsActions, addChannel, renameChannel, removeChannel } from './Channels';
import { messages, messagesActions, addMessage } from './Messages';
import { activeChannel, activeChannelActions } from './ActiveChannel';
import { modalInfo, modalActions } from './Modal';

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...activeChannelActions,
  ...modalActions,
  ...usersActions,
};

const asyncActions = {
  addUser,
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
};

export { actions, asyncActions };

export default combineReducers({
  users,
  channels,
  messages,
  activeChannel,
  modalInfo,
});

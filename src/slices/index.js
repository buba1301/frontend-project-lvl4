import { combineReducers } from 'redux';
import { users, usersActions, addUser } from './Users';
import {
  channels,
  channelsActions,
  addChannel,
  renameChannel,
  removeChannel,
} from './Channels';
import {
  messages,
  messagesActions,
  addMessage,
  removeMessage,
} from './Messages';
import { activeChannel, activeChannelActions } from './ActiveChannel';
import { modalInfo, modalActions } from './Modal';
import { currentUser, currentUserActions } from './CurrentUser';

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...activeChannelActions,
  ...modalActions,
  ...usersActions,
  ...currentUserActions,
};

const asyncActions = {
  addUser,
  addMessage,
  removeMessage,
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
  currentUser,
  modalInfo,
});

import { combineReducers } from 'redux';
import {
  channels, channelsActions, addChannel, renameChannel, removeChannel,
} from './Channels';
import { messages, messagesActions, addMessage } from './Messages';
import { activeChannel, activeChannelActions } from './ActiveChannel';
import { modalInfo, modalActions } from './Modal';

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...activeChannelActions,
  ...modalActions,
};

const asyncActions = {
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
};

export {
  actions,
  asyncActions,
};

export default combineReducers({
  channels,
  messages,
  activeChannel,
  modalInfo,
});

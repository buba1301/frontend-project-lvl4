import { combineReducers } from 'redux';

import { channels, channelsActions } from './Channels';
import { messages, messagesActions, addMessage } from './Messages';
import { activeChannel, activeChannelActions } from './ActiveChannel';

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...activeChannelActions,
};

const asyncActions = {
  addMessage,
};

export {
  actions,
  asyncActions,
};

export default combineReducers({
  channels,
  messages,
  activeChannel,
});

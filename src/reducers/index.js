/* eslint-disable no-shadow */
import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const channels = handleActions({
  [actions.getDataChannels](state, { payload: { channels } }) {
    console.log('actions.getDataChannels', channels);
    const byId = _.keyBy(channels, 'id');
    const allIds = channels.map((channel) => channel.id);
    return { byId, allIds };
  },
}, { byId: {}, allIds: [] });

const messages = handleActions({
  [actions.getDataChannels](state, { payload: { messages } }) {
    return {
      byId: _.keyBy(messages, 'id'),
      allIds: messages.map(({ id }) => id),
    };
  },
}, { byId: {}, allIds: [] });

const channelUIState = handleActions({
  [actions.getDataChannels](state, { payload: { currentChannelId } }) {
    return { activeChannel: currentChannelId };
  },
}, { activeChannel: '' });


export default combineReducers({
  channels,
  messages,
  channelUIState,
  form: formReducer,
});

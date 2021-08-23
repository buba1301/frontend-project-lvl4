import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { actions } from './slices';
import store from './lib/store';
import App from './App';

const socket = io({
  transports: ['websocket'],
});

export default (gon) => {
  const defaultId = gon.currentChannelId;

  store.dispatch(actions.getDataChannels(gon));
  store.dispatch(actions.getDataUsers(gon));
  store.dispatch(actions.getDataMessages(gon));
  store.dispatch(actions.setActiveChannel(gon.currentChannelId));

  // TODO: add userName in message header

  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addMessagesSuccess([attributes]));
  });
  socket.on('newUser', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addUserSuccess([attributes]));
  });
  socket.on('newChannel', ({ data }) => {
    const { attributes, id } = data;
    store.dispatch(actions.addChannelSuccess([attributes]));
    store.dispatch(actions.setActiveChannel(id));
  });
  socket.on('renameChannel', ({ data }) => {
    store.dispatch(actions.renameChannelSuccess(data));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(actions.setActiveChannel(defaultId));
    store.dispatch(actions.removeChannelSuccess(data));
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

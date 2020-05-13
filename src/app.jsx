/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import socket from './utils/socket.js';
import { actions } from './slices';
import store from './lib/store';
import App from './components/App.jsx';
import getUserName from './utils/user';
import Context from './utils/context';

export default (gon) => {
  const defaultId = gon.currentChannelId;

  store.dispatch(actions.getDataChannels(gon));
  store.dispatch(actions.getDataMessages(gon));
  store.dispatch(actions.setActiveChannel(gon.currentChannelId));

  const userName = getUserName();
  console.log('APP_userName', userName);

  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addMessagesSuccess([attributes]));
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
    console.log('app.jsx', data);
    store.dispatch(actions.setActiveChannel(defaultId));
    store.dispatch(actions.removeChannelSuccess(data));
  });

  render(
    <Provider store={store}>
      <Context.Provider value={userName}>
        <App />
      </Context.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

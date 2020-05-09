/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import socket from './socket.js';
import { actions } from './slices';
import store from './store';
import App from './components/App.jsx';
import getUserName from './user';
import Context from './context';

export default (gon) => {
  store.dispatch(actions.getDataChannels(gon));
  store.dispatch(actions.getDataMessages(gon));
  store.dispatch(actions.getDataActiveChannel(gon));

  const userName = getUserName();
  console.log('APP_userName', userName);

  socket.on('newMessage', ({ data }) => {
    const { attributes } = data;
    store.dispatch(actions.addMessagesSuccess([attributes]));
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

// @ts-check

import _ from 'lodash';
import defaultMessages from './data';

const getNextId = (value) => `${value}_${Number(_.uniqueId())}`;

const buildState = (defaultState) => {
  const generalChannelId = getNextId('channel');
  const randomChannelId = getNextId('channel');
  const state = {
    channels: [
      { id: generalChannelId, name: 'general', removable: false },
      { id: randomChannelId, name: 'random', removable: false },
    ],
    messages: [...defaultMessages],
    currentChannelId: generalChannelId,
    users: [],
  };

  if (defaultState.messages) {
    state.messages.push(...defaultState.messages);
  }
  if (defaultState.channels) {
    state.channels.push(...defaultState.channels);
  }
  if (defaultState.currentChannelId) {
    state.currentChannelId = defaultState.currentChannelId;
  }

  return state;
};

export default (app, io, defaultState = {}) => {
  const state = buildState(defaultState);

  app
    .get('/', (_req, reply) => {
      reply.view('index.pug', { gon: state });
    })
    .post('/api/v1/channels/:channelId/users', (req, reply) => {
      const {
        data: { attributes },
      } = req.body;

      const user = {
        ...attributes,
        id: getNextId('user'),
        channelId: req.params.channelId,
      };

      state.users.push(user);
      reply.code(201);

      const data = {
        data: {
          type: 'users',
          id: user.id,
          attributes: user,
        },
      };

      reply.send(data);
      io.emit('newUser', data); // отправить событие на все подключенные сокеты
    })
    .get('/api/v1/channels', (_req, reply) => {
      const resources = state.channels.map((c) => ({
        type: 'channels',
        id: c.id,
        attributes: c,
      }));
      const response = {
        data: resources,
      };
      reply.send(response);
    })
    .post('/api/v1/channels', (req, reply) => {
      const {
        data: {
          attributes: { name },
        },
      } = req.body;
      const channel = {
        name,
        removable: true,
        id: getNextId('channel'),
      };
      state.channels.push(channel);
      reply.code(201);
      const data = {
        data: {
          type: 'channels',
          id: channel.id,
          attributes: channel,
        },
      };

      reply.send(data);
      io.emit('newChannel', data); // отправить событие на все подключенные сокеты
    })
    .delete('/api/v1/channels/:id', (req, reply) => {
      const channelId = Number(req.params.id);
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
      reply.code(204);
      const data = {
        data: {
          type: 'channels',
          id: channelId,
        },
      };

      reply.send(data);
      io.emit('removeChannel', data); // отправить событие на все подключенные сокеты
    })
    .patch('/api/v1/channels/:id', (req, reply) => {
      const channelId = Number(req.params.id);
      const channel = state.channels.find((c) => c.id === channelId);

      const {
        data: { attributes },
      } = req.body;
      channel.name = attributes.name;

      const data = {
        data: {
          type: 'channels',
          id: channelId,
          attributes: channel,
        },
      };
      reply.send(data);
      io.emit('renameChannel', data); // отправить событие на все подключенные сокеты
    })
    .get('/api/v1/channels/:channelId/messages', (req, reply) => {
      const messages = state.messages.filter((m) => m.channelId === Number(req.params.channelId));
      const resources = messages.map((m) => ({
        type: 'messages',
        id: m.id,
        attributes: m,
      }));
      const response = {
        data: resources,
      };
      reply.send(response);
    })
    .post('/api/v1/channels/:channelId/messages', (req, reply) => {
      const {
        data: { attributes },
      } = req.body;

      const message = {
        ...attributes,
        channelId: req.params.channelId,
        id: getNextId('message'),
      };
      state.messages.push(message);
      reply.code(201);
      const data = {
        data: {
          type: 'messages',
          id: message.id,
          attributes: message,
        },
      };
      reply.send(data);
      io.emit('newMessage', data); // отправить событие на все подключенные сокеты
    });
};

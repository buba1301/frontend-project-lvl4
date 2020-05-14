"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getNextId = function getNextId() {
  return Number(_lodash["default"].uniqueId());
};

var buildState = function buildState(defaultState) {
  var generalChannelId = getNextId();
  var randomChannelId = getNextId();
  var state = {
    channels: [{
      id: generalChannelId,
      name: 'general',
      removable: false
    }, {
      id: randomChannelId,
      name: 'random',
      removable: false
    }],
    messages: [],
    currentChannelId: generalChannelId
  };

  if (defaultState.messages) {
    var _state$messages;

    (_state$messages = state.messages).push.apply(_state$messages, _toConsumableArray(defaultState.messages));
  }

  if (defaultState.channels) {
    var _state$channels;

    (_state$channels = state.channels).push.apply(_state$channels, _toConsumableArray(defaultState.channels));
  }

  if (defaultState.currentChannelId) {
    state.currentChannelId = defaultState.currentChannelId;
  }

  return state;
};

var _default = function _default(app, io) {
  var defaultState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var state = buildState(defaultState);
  app.get('/', function (_req, reply) {
    reply.view('index.pug', {
      gon: state
    });
  }).get('/api/v1/channels', function (_req, reply) {
    var resources = state.channels.map(function (c) {
      return {
        type: 'channels',
        id: c.id,
        attributes: c
      };
    });
    var response = {
      data: resources
    };
    reply.send(response);
  }).post('/api/v1/channels', function (req, reply) {
    var name = req.body.data.attributes.name;
    var channel = {
      name: name,
      removable: true,
      id: getNextId()
    };
    state.channels.push(channel);
    reply.code(201);
    var data = {
      data: {
        type: 'channels',
        id: channel.id,
        attributes: channel
      }
    };
    reply.send(data);
    io.emit('newChannel', data); // отправить событие на все подключенные сокеты
  })["delete"]('/api/v1/channels/:id', function (req, reply) {
    var channelId = Number(req.params.id);
    state.channels = state.channels.filter(function (c) {
      return c.id !== channelId;
    });
    state.messages = state.messages.filter(function (m) {
      return m.channelId !== channelId;
    });
    reply.code(204);
    var data = {
      data: {
        type: 'channels',
        id: channelId
      }
    };
    reply.send(data);
    io.emit('removeChannel', data); // отправить событие на все подключенные сокеты
  }).patch('/api/v1/channels/:id', function (req, reply) {
    var channelId = Number(req.params.id);
    var channel = state.channels.find(function (c) {
      return c.id === channelId;
    });
    var attributes = req.body.data.attributes;
    channel.name = attributes.name;
    var data = {
      data: {
        type: 'channels',
        id: channelId,
        attributes: channel
      }
    };
    reply.send(data);
    io.emit('renameChannel', data); // отправить событие на все подключенные сокеты
  }).get('/api/v1/channels/:channelId/messages', function (req, reply) {
    var messages = state.messages.filter(function (m) {
      return m.channelId === Number(req.params.channelId);
    });
    var resources = messages.map(function (m) {
      return {
        type: 'messages',
        id: m.id,
        attributes: m
      };
    });
    var response = {
      data: resources
    };
    reply.send(response);
  }).post('/api/v1/channels/:channelId/messages', function (req, reply) {
    var attributes = req.body.data.attributes;

    var message = _objectSpread(_objectSpread({}, attributes), {}, {
      channelId: Number(req.params.channelId),
      id: getNextId()
    });

    state.messages.push(message);
    reply.code(201);
    var data = {
      data: {
        type: 'messages',
        id: message.id,
        attributes: message
      }
    };
    reply.send(data);
    io.emit('newMessage', data); // отправить событие на все подключенные сокеты
  });
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci9yb3V0ZXMuanMiXSwibmFtZXMiOlsiZ2V0TmV4dElkIiwiTnVtYmVyIiwiXyIsInVuaXF1ZUlkIiwiYnVpbGRTdGF0ZSIsImRlZmF1bHRTdGF0ZSIsImdlbmVyYWxDaGFubmVsSWQiLCJyYW5kb21DaGFubmVsSWQiLCJzdGF0ZSIsImNoYW5uZWxzIiwiaWQiLCJuYW1lIiwicmVtb3ZhYmxlIiwibWVzc2FnZXMiLCJjdXJyZW50Q2hhbm5lbElkIiwicHVzaCIsImFwcCIsImlvIiwiZ2V0IiwiX3JlcSIsInJlcGx5IiwidmlldyIsImdvbiIsInJlc291cmNlcyIsIm1hcCIsImMiLCJ0eXBlIiwiYXR0cmlidXRlcyIsInJlc3BvbnNlIiwiZGF0YSIsInNlbmQiLCJwb3N0IiwicmVxIiwiYm9keSIsImNoYW5uZWwiLCJjb2RlIiwiZW1pdCIsImNoYW5uZWxJZCIsInBhcmFtcyIsImZpbHRlciIsIm0iLCJwYXRjaCIsImZpbmQiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUcsU0FBWkEsU0FBWTtBQUFBLFNBQU1DLE1BQU0sQ0FBQ0MsbUJBQUVDLFFBQUYsRUFBRCxDQUFaO0FBQUEsQ0FBbEI7O0FBRUEsSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsWUFBRCxFQUFrQjtBQUNuQyxNQUFNQyxnQkFBZ0IsR0FBR04sU0FBUyxFQUFsQztBQUNBLE1BQU1PLGVBQWUsR0FBR1AsU0FBUyxFQUFqQztBQUNBLE1BQU1RLEtBQUssR0FBRztBQUNaQyxJQUFBQSxRQUFRLEVBQUUsQ0FDUjtBQUFFQyxNQUFBQSxFQUFFLEVBQUVKLGdCQUFOO0FBQXdCSyxNQUFBQSxJQUFJLEVBQUUsU0FBOUI7QUFBeUNDLE1BQUFBLFNBQVMsRUFBRTtBQUFwRCxLQURRLEVBRVI7QUFBRUYsTUFBQUEsRUFBRSxFQUFFSCxlQUFOO0FBQXVCSSxNQUFBQSxJQUFJLEVBQUUs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Q0MsSUFEdUIsQ0FDcERKLElBRG9ELENBQzVDRixVQUQ0Qzs7QUFFNUQsUUFBTWdCLE9BQU8sbUNBQ1JoQixVQURRO0FBRVhVLE1BQUFBLFNBQVMsRUFBRXBDLE1BQU0sQ0FBQytCLEdBQUcsQ0FBQ00sTUFBSixDQUFXRCxTQUFaLENBRk47QUFHWDNCLE1BQUFBLEVBQUUsRUFBRVYsU0FBUztBQUhGLE1BQWI7O0FBS0FRLElBQUFBLEtBQUssQ0FBQ0ssUUFBTixDQUFlRSxJQUFmLENBQW9CNEIsT0FBcEI7QUFDQXZCLElBQUFBLEtBQUssQ0FBQ2UsSUFBTixDQUFXLEdBQVg7QUFDQSxRQUFNTixJQUFJLEdBQUc7QUFDWEEsTUFBQUEsSUFBSSxFQUFFO0FBQ0pILFFBQUFBLElBQUksRUFBRSxVQURGO0FBRUpoQixRQUFBQSxFQUFFLEVBQUVpQyxPQUFPLENBQUNqQyxFQUZSO0FBR0ppQixRQUFBQSxVQUFVLEVBQUVnQjtBQUhSO0FBREssS0FBYjtBQU9BdkIsSUFBQUEsS0FBSyxDQUFDVSxJQUFOLENBQVdELElBQVg7QUFDQVosSUFBQUEsRUFBRSxDQUFDbUIsSUFBSCxDQUFRLFlBQVIsRUFBc0JQLElBQXRCLEVBakI0RCxDQWlCL0I7QUFDOUIsR0FqR0g7QUFrR0QsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1jaGVja1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBnZXROZXh0SWQgPSAoKSA9PiBOdW1iZXIoXy51bmlxdWVJZCgpKTtcblxuY29uc3QgYnVpbGRTdGF0ZSA9IChkZWZhdWx0U3RhdGUpID0+IHtcbiAgY29uc3QgZ2VuZXJhbENoYW5uZWxJZCA9IGdldE5leHRJZCgpO1xuICBjb25zdCByYW5kb21DaGFubmVsSWQgPSBnZXROZXh0SWQoKTtcbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgY2hhbm5lbHM6IFtcbiAgICAgIHsgaWQ6IGdlbmVyYWxDaGFubmVsSWQsIG5hbWU6ICdnZW5lcmFsJywgcmVtb3ZhYmxlOiBmYWxzZSB9LFxuICAgICAgeyBpZDogcmFuZG9tQ2hhbm5lbElkLCBuYW1lOiAncmFuZG9tJywgcmVtb3ZhYmxlOiBmYWxzZSB9LFxuICAgIF0sXG4gICAgbWVzc2FnZXM6IFtdLFxuICAgIGN1cnJlbnRDaGFubmVsSWQ6IGdlbmVyYWxDaGFubmVsSWQsXG4gIH07XG5cbiAgaWYgKGRlZmF1bHRTdGF0ZS5tZXNzYWdlcykge1xuICAgIHN0YXRlLm1lc3NhZ2VzLnB1c2goLi4uZGVmYXVsdFN0YXRlLm1lc3NhZ2VzKTtcbiAgfVxuICBpZiAoZGVmYXVsdFN0YXRlLmNoYW5uZWxzKSB7XG4gICAgc3RhdGUuY2hhbm5lbHMucHVzaCguLi5kZWZhdWx0U3RhdGUuY2hhbm5lbHMpO1xuICB9XG4gIGlmIChkZWZhdWx0U3RhdGUuY3VycmVudENoYW5uZWxJZCkge1xuICAgIHN0YXRlLmN1cnJlbnRDaGFubmVsSWQgPSBkZWZhdWx0U3RhdGUuY3VycmVudENoYW5uZWxJZDtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IChhcHAsIGlvLCBkZWZhdWx0U3RhdGUgPSB7fSkgPT4ge1xuICBjb25zdCBzdGF0ZSA9IGJ1aWxkU3RhdGUoZGVmYXVsdFN0YXRlKTtcblxuICBhcHBcbiAgICAuZ2V0KCcvJywgKF9yZXEsIHJlcGx5KSA9PiB7XG4gICAgICByZXBseS52aWV3KCdpbmRleC5wdWcnLCB7IGdvbjogc3RhdGUgfSk7XG4gICAgfSlcbiAgICAuZ2V0KCcvYXBpL3YxL2NoYW5uZWxzJywgKF9yZXEsIHJlcGx5KSA9PiB7XG4gICAgICBjb25zdCByZXNvdXJjZXMgPSBzdGF0ZS5jaGFubmVscy5tYXAoKGMpID0+ICh7XG4gICAgICAgIHR5cGU6ICdjaGFubmVscycsXG4gICAgICAgIGlkOiBjLmlkLFxuICAgICAgICBhdHRyaWJ1dGVzOiBjLFxuICAgICAgfSkpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc291cmNlcyxcbiAgICAgIH07XG4gICAgICByZXBseS5zZW5kKHJlc3BvbnNlKTtcbiAgICB9KVxuICAgIC5wb3N0KCcvYXBpL3YxL2NoYW5uZWxzJywgKHJlcSwgcmVwbHkpID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YTogeyBhdHRyaWJ1dGVzOiB7IG5hbWUgfSB9IH0gPSByZXEuYm9keTtcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHJlbW92YWJsZTogdHJ1ZSxcbiAgICAgICAgaWQ6IGdldE5leHRJZCgpLFxuICAgICAgfTtcbiAgICAgIHN0YXRlLmNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG4gICAgICByZXBseS5jb2RlKDIwMSk7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdHlwZTogJ2NoYW5uZWxzJyxcbiAgICAgICAgICBpZDogY2hhbm5lbC5pZCxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBjaGFubmVsLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgcmVwbHkuc2VuZChkYXRhKTtcbiAgICAgIGlvLmVtaXQoJ25ld0NoYW5uZWwnLCBkYXRhKTsgLy8g0L7RgtC/0YDQsNCy0LjRgtGMINGB0L7QsdGL0YLQuNC1INC90LAg0LLRgdC1INC/0L7QtNC60LvRjtGH0LXQvdC90YvQtSDRgdC+0LrQtdGC0YtcbiAgICB9KVxuICAgIC5kZWxldGUoJy9hcGkvdjEvY2hhbm5lbHMvOmlkJywgKHJlcSwgcmVwbHkpID0+IHtcbiAgICAgIGNvbnN0IGNoYW5uZWxJZCA9IE51bWJlcihyZXEucGFyYW1zLmlkKTtcbiAgICAgIHN0YXRlLmNoYW5uZWxzID0gc3RhdGUuY2hhbm5lbHMuZmlsdGVyKChjKSA9PiBjLmlkICE9PSBjaGFubmVsSWQpO1xuICAgICAgc3RhdGUubWVzc2FnZXMgPSBzdGF0ZS5tZXNzYWdlcy5maWx0ZXIoKG0pID0+IG0uY2hhbm5lbElkICE9PSBjaGFubmVsSWQpO1xuICAgICAgcmVwbHkuY29kZSgyMDQpO1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHR5cGU6ICdjaGFubmVscycsXG4gICAgICAgICAgaWQ6IGNoYW5uZWxJZCxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIHJlcGx5LnNlbmQoZGF0YSk7XG4gICAgICBpby5lbWl0KCdyZW1vdmVDaGFubmVsJywgZGF0YSk7IC8vINC+0YLQv9GA0LDQstC40YLRjCDRgdC+0LHRi9GC0LjQtSDQvdCwINCy0YHQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LUg0YHQvtC60LXRgtGLXG4gICAgfSlcbiAgICAucGF0Y2goJy9hcGkvdjEvY2hhbm5lbHMvOmlkJywgKHJlcSwgcmVwbHkpID0+IHtcbiAgICAgIGNvbnN0IGNoYW5uZWxJZCA9IE51bWJlcihyZXEucGFyYW1zLmlkKTtcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSBzdGF0ZS5jaGFubmVscy5maW5kKChjKSA9PiBjLmlkID09PSBjaGFubmVsSWQpO1xuXG4gICAgICBjb25zdCB7IGRhdGE6IHsgYXR0cmlidXRlcyB9IH0gPSByZXEuYm9keTtcbiAgICAgIGNoYW5uZWwubmFtZSA9IGF0dHJpYnV0ZXMubmFtZTtcblxuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHR5cGU6ICdjaGFubmVscycsXG4gICAgICAgICAgaWQ6IGNoYW5uZWxJZCxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBjaGFubmVsLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJlcGx5LnNlbmQoZGF0YSk7XG4gICAgICBpby5lbWl0KCdyZW5hbWVDaGFubmVsJywgZGF0YSk7IC8vINC+0YLQv9GA0LDQstC40YLRjCDRgdC+0LHRi9GC0LjQtSDQvdCwINCy0YHQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LUg0YHQvtC60LXRgtGLXG4gICAgfSlcbiAgICAuZ2V0KCcvYXBpL3YxL2NoYW5uZWxzLzpjaGFubmVsSWQvbWVzc2FnZXMnLCAocmVxLCByZXBseSkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBzdGF0ZS5tZXNzYWdlcy5maWx0ZXIoKG0pID0+IG0uY2hhbm5lbElkID09PSBOdW1iZXIocmVxLnBhcmFtcy5jaGFubmVsSWQpKTtcbiAgICAgIGNvbnN0IHJlc291cmNlcyA9IG1lc3NhZ2VzLm1hcCgobSkgPT4gKHtcbiAgICAgICAgdHlwZTogJ21lc3NhZ2VzJyxcbiAgICAgICAgaWQ6IG0uaWQsXG4gICAgICAgIGF0dHJpYnV0ZXM6IG0sXG4gICAgICB9KSk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzb3VyY2VzLFxuICAgICAgfTtcbiAgICAgIHJlcGx5LnNlbmQocmVzcG9uc2UpO1xuICAgIH0pXG4gICAgLnBvc3QoJy9hcGkvdjEvY2hhbm5lbHMvOmNoYW5uZWxJZC9tZXNzYWdlcycsIChyZXEsIHJlcGx5KSA9PiB7XG4gICAgICBjb25zdCB7IGRhdGE6IHsgYXR0cmlidXRlcyB9IH0gPSByZXEuYm9keTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIC4uLmF0dHJpYnV0ZXMsXG4gICAgICAgIGNoYW5uZWxJZDogTnVtYmVyKHJlcS5wYXJhbXMuY2hhbm5lbElkKSxcbiAgICAgICAgaWQ6IGdldE5leHRJZCgpLFxuICAgICAgfTtcbiAgICAgIHN0YXRlLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICByZXBseS5jb2RlKDIwMSk7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdHlwZTogJ21lc3NhZ2VzJyxcbiAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBtZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJlcGx5LnNlbmQoZGF0YSk7XG4gICAgICBpby5lbWl0KCduZXdNZXNzYWdlJywgZGF0YSk7IC8vINC+0YLQv9GA0LDQstC40YLRjCDRgdC+0LHRi9GC0LjQtSDQvdCwINCy0YHQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LUg0YHQvtC60LXRgtGLXG4gICAgfSk7XG59O1xuIl19
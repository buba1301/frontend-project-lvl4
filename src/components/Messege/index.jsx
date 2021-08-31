import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { IoIosTrash } from 'react-icons/io';
import Icon from '../Icon';

import { asyncActions, actions } from '../../slices/index';

import './styles.css';

// eslint-disable-next-line object-curly-newline
const Message = ({ isReverse, isRemovable, message, avatar, id, date }) => {
  const dispatch = useDispatch();

  const handleDeleteMessage = async (event) => {
    const currentMessageId = event.currentTarget.getAttribute('data-id');
    console.log('DELETE MESSAGE', currentMessageId);

    try {
      await dispatch(asyncActions.removeMessage({ id: currentMessageId }));
      console.log('Done');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={classNames('item', {
        reverse: isReverse,
        removable: isRemovable,
      })}
    >
      <img src={avatar} className="avatar" alt="Avatar" />
      <div className="list">
        <div className="list-item" key={id}>
          <div className="text">{message}</div>
          <div className="time">{dayjs(date).format('HH:mm')}</div>
          <Icon size={15} className="message-status" name="MessageReaded" />
          <IoIosTrash
            data-id={id}
            size={18}
            className="remove-message"
            onClick={handleDeleteMessage}
          />
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  isReverse: PropTypes.bool.isRequired,
  isRemovable: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Message;

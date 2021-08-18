import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { IoIosTrash } from 'react-icons/io';
import Icon from '../Icon';

import './styles.css';

// eslint-disable-next-line object-curly-newline
const Message = ({ isReverse, isRemovable, message, avatar, id, date }) => {
  console.log('IsReverse', isReverse);

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
          <IoIosTrash data-id={id} size={18} className="remove-message" />
        </div>
      </div>
    </div>
  );
};

/* Message.propTypes = {
  isReverse: PropTypes.bool.isRequired,
  isRemovable: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}; */

export default Message;

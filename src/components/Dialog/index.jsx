import React from 'react';
import { useSelector } from 'react-redux';
import Message from '../Messege';

import normalizeDialog from './helpers';

import './styles.css';

const Dialog = () => {
  const messages = useSelector((state) => state.messages);

  const normalizedDialog = normalizeDialog(messages);

  return (
    <div className="dialog">
      <div className="overflow">
        {normalizedDialog.map((item) => (
          <Message
            key={item.id}
            avatar={item.avatar}
            message={item.message}
            id={item.id}
            date={item.date}
            isReverse={item.isReverse}
            isRemovable={item.isRemovable}
          />
        ))}
      </div>
    </div>
  );
};

export default Dialog;

import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Context from '../../context';
import Message from '../Messege';

import normalizeDialog from './helpers';

import './styles.css';

const Dialog = () => {
  const messages = useSelector((state) => state.messages);

  const userName = useContext(Context);

  const normalizedDialog = normalizeDialog(messages, userName);

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

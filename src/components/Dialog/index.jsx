import React from 'react';
import Message from '../Messege';

import normalizeDialog from './helpers';
import data from '../../data';

import './styles.css';

const Dialog = () => {
  const normalizedDialog = normalizeDialog(data);

  return (
    <div className="dialog">
      <div className="overflow">
        {normalizedDialog.map((item) => (
          <Message {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Dialog;

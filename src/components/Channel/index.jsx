/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classnames from 'classnames';

import { IoIosTrash } from 'react-icons/io';

import './styles.css';

const Channel = ({ id, name, activeChannel, removable, onClick, onClickDelete, onClickRename }) => {
  const classNames = classnames('channelItem', {
    activeChannel: id === activeChannel,
  });

  return (
    <div className={classNames} onClick={onClick(id)}>
      <div className="nameWrap" onDoubleClick={onClickRename}>
        {name}
      </div>
      {removable && <IoIosTrash data-id={id} size={18} className="remove-channel" onClick={onClickDelete} />}
    </div>
  );
};

export default Channel;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { IoIosTrash } from 'react-icons/io';

import './styles.css';

const Channel = ({
  id,
  name,
  activeChannel,
  removable,
  onClick,
  onClickDelete,
  onClickRename,
}) => {
  const classNames = classnames('channelItem', {
    activeChannel: id === activeChannel,
  });

  return (
    <div className={classNames} onClick={onClick(id)}>
      <div className="nameWrap" onDoubleClick={onClickRename('rename')}>
        {name}
      </div>
      {removable && (
        <IoIosTrash
          data-id={id}
          size={18}
          className="remove-channel"
          onClick={onClickDelete('remove')}
        />
      )}
    </div>
  );
};

Channel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  activeChannel: PropTypes.string.isRequired,
  removable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickRename: PropTypes.func.isRequired,
};

export default Channel;

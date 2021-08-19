/* eslint-disable max-len */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { IoIosAddCircle } from 'react-icons/io';
import { actions } from '../../slices';

import './styles.css';
import Channel from '../Channel';
import { log } from 'debug';

const renderChannel = (id, name, activeChannel, onClick) => {
  const buttonClasses = cn('nav-link btn btn-block', {
    active: id === activeChannel,
  });

  return (
    <li className="nav-item" key={id}>
      <button type="button" className={buttonClasses} onClick={onClick(id)}>
        {name}
      </button>
    </li>
  );
};

const ChannelsBox = () => {
  const channels = useSelector((state) => state.channels);
  const activeChannel = useSelector((state) => state.activeChannel);

  console.log('CHANNEL BOX', channels);

  const { setActiveChannel } = actions;

  const dispatch = useDispatch();

  const handleSetActiveChannel = (id) => () => {
    dispatch(setActiveChannel(id));
  };

  return (
    <div className="channelWrap">
      <div className="channelHeader">
        <div className="nameWrap">Channels</div>
        <IoIosAddCircle size={25} className="addIcon" />
      </div>
      <div className="itemsWrap">
        {channels.map(({ id, name }) => (
          <Channel
            key={id}
            id={id}
            name={name}
            activeChannel={activeChannel}
            onClick={handleSetActiveChannel}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelsBox;

//  {channels.map(({ id, name }) => renderChannel(id, name, activeChannel, handleSetActiveChannel))}

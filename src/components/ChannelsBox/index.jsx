/* eslint-disable max-len */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions } from '../../slices';

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

const ChannelsBox = ({ handleModal }) => {
  const channels = useSelector((state) => state.channels);
  const activeChannel = useSelector((state) => state.activeChannel);

  const { setActiveChannel } = actions;

  const dispatch = useDispatch();

  const handleSetActiveChannel = (id) => () => {
    dispatch(setActiveChannel(id));
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto" onClick={handleModal('adding')}>
          +
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => renderChannel(id, name, activeChannel, handleSetActiveChannel))}
      </ul>
    </div>
  );
};

export default ChannelsBox;

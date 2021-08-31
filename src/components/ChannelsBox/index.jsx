/* eslint-disable max-len */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosAddCircle } from 'react-icons/io';

import { actions } from '../../slices';

import './styles.css';

import Channel from '../Channel';
import ModalDialog from '../Modals/ModalDialog';

const ChannelsBox = () => {
  const [openedModal, setOpenedModal] = useState(false);
  const [modalType, setModalType] = useState(false);

  const channels = useSelector((state) => state.channels);
  const activeChannel = useSelector((state) => state.activeChannel);

  const { setActiveChannel } = actions;

  const dispatch = useDispatch();

  const handleSetActiveChannel = (id) => () => {
    dispatch(setActiveChannel(id));
  };

  const handleClick = (type) => () => {
    setModalType(type);
    setOpenedModal(true);
  };

  return (
    <>
      <div className="channelWrap">
        <div className="channelHeader">
          <div className="nameWrap">Channels</div>
          <IoIosAddCircle
            size={25}
            className="addIcon"
            onClick={handleClick('add')}
          />
        </div>
        <div className="itemsWrap">
          {channels.map(({ id, name, removable }) => (
            <Channel
              key={id}
              id={id}
              name={name}
              removable={removable}
              activeChannel={activeChannel}
              onClick={handleSetActiveChannel}
              onClickDelete={handleClick}
              onClickRename={handleClick}
            />
          ))}
        </div>
      </div>
      <ModalDialog
        opened={openedModal}
        setOpened={setOpenedModal}
        modalType={modalType}
      />
    </>
  );
};

export default ChannelsBox;

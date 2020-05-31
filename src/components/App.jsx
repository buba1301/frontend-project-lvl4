import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Channels from './ChannelsBox';
import Chat from './Chat';
import getModal from './Modals/index';
import { actions } from '../slices/index.js';

const renderModal = ({ type }) => {
  if (!type) {
    return null;
  }
  const Component = getModal(type);
  return <Component />;
};

const App = () => {
  const modalInfo = useSelector((state) => state.modalInfo);

  const { showModal } = actions;

  const dispatch = useDispatch();

  const handleModal = (type, id = null) => () => {
    dispatch(showModal({ type, id }));
  };

  return (
    <>
      <div className="row h-100 pb-3">
        <Channels handleModal={handleModal} />
        <Chat handleModal={handleModal} />
        {renderModal(modalInfo)}
      </div>
    </>
  );
};

export default App;

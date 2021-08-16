import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChannelsBox from './components/ChannelsBox';
import Chat from './components/Chat';
import Header from './components/Header';
import getModal from './components/Modals/index';
import { actions } from './slices/index.js';

import './index.css';

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

  const handleModal = (type, id = null) => {
    dispatch(showModal({ type, id }));
  };

  return (
    <div className="container">
      <Header />
      <div className="row h-100 pb-3">
        <ChannelsBox handleModal={() => handleModal} />
        <Chat handleModal={handleModal} />
        {renderModal(modalInfo)}
      </div>
    </div>
  );
};

export default App;

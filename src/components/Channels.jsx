import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
// import { actions } from '../slices/index.js';

const renderChannel = (id, name, activeChannel) => {
  console.log('li', name);
  const buttonClasses = cn({
    'nav-link': true,
    'btn btn-block': true,
    active: id === activeChannel,
  });

  return (
    <li className="nav-item" key={id}>
      <button type="button" className={buttonClasses}>{name}</button>
    </li>
  );
};

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const activeChannel = useSelector((state) => state.activeChannel);

  // const dispatch = useDispatch();

  return (

    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => renderChannel(id, name, activeChannel))}
      </ul>
    </div>
  );
};

export default Channels;

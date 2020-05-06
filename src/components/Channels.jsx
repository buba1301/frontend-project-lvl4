import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
// import * as actions from '../actions/index';


const mapStateToProps = (state) => {
  const { channels, channelUIState: { activeChannel } } = state;
  console.log('Channels ', activeChannel);
  return {
    channels: channels.allIds.map((id) => channels.byId[id]),
    activeChannel,
  };
};

const Channels = (props) => {
  const { channels, activeChannel } = props;
  console.log('Channels ', channels, activeChannel);


  return (

    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => {
          console.log('li', id === activeChannel);
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
        })}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(Channels);

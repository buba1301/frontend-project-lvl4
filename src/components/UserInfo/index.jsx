/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import Context from '../../context';
import './styles.css';

const UserInfo = () => {
  const userName = useContext(Context);

  return (
    <div className="user-info">
      <div className="name">{userName}</div>
      <div className="status">
        <span className="circle" />В сети
      </div>
    </div>
  );
};

export default UserInfo;

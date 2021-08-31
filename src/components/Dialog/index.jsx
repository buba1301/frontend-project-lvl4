/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import useScrollDown from '../../hooks/useScrollDown';
import Message from './Messege';

import normalizeDialog from './helpers';

import './styles.css';
import Title from './Title';

const selectActiveMassages = createSelector(
  (state) => state.messages,
  (state) => state.activeChannel,
  (messages, activeChannel) =>
    messages.filter(({ channelId }) => channelId === activeChannel),
);

const Dialog = () => {
  const activeMessages = useSelector((state) => selectActiveMassages(state));
  const userName = useSelector((state) => state.currentUser);

  const messageEl = useRef(null);

  // const normalizedDialog = normalizeDialog(activeMessages, userName);

  const normalizedDialog = normalizeDialog(activeMessages, userName);

  useScrollDown(messageEl);

  return (
    <div className="dialog">
      <div className="overflow" ref={messageEl}>
        {normalizedDialog &&
          normalizedDialog.map((item) =>
            item.type === 'message' ? (
              <Message
                key={item.id}
                avatar={item.avatar}
                message={item.message}
                id={item.id}
                date={item.date}
                userName={item.userName}
                isReverse={item.isReverse}
                isRemovable={item.isRemovable}
              />
            ) : (
              <Title key={item.id} date={item.date} />
            ),
          )}
      </div>
    </div>
  );
};

export default Dialog;

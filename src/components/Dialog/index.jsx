import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import Context from '../../context';
import Message from '../Messege';

import normalizeDialog from './helpers';

import './styles.css';

const selectActiveMassages = createSelector(
  (state) => state.messages,
  (state) => state.activeChannel,
  (messages, activeChannel) => messages.filter(({ channelId }) => channelId === activeChannel),
);

const Dialog = () => {
  const activeMessages = useSelector((state) => selectActiveMassages(state));

  const messageEl = useRef(null);

  const userName = useContext(Context);

  const normalizedDialog = normalizeDialog(activeMessages, userName);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  return (
    <div className="dialog">
      <div className="overflow" ref={messageEl}>
        {normalizedDialog && normalizedDialog.map((item) => (
          <Message
            key={item.id}
            avatar={item.avatar}
            message={item.message}
            id={item.id}
            date={item.date}
            isReverse={item.isReverse}
            isRemovable={item.isRemovable}
          />
        ))}
      </div>
    </div>
  );
};

export default Dialog;

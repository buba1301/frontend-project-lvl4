/* eslint-disable object-curly-newline */
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { asyncActions } from '../../slices/index';

import './styles.css';

const MessageInput = () => {
  const { t } = useTranslation();

  const activeChannel = useSelector((state) => state.activeChannel);

  const userName = useSelector((state) => state.currentUser);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const dispatch = useDispatch();

  const handleSubmit = async ({ message }, { resetForm, setStatus }) => {
    const { addMessage } = asyncActions;

    const date = new Date();

    const avatar = 'https://sun9-58.userapi.com/c836638/v836638514/867c/SPMigNB8gw0.jpg';

    const messageData = { activeChannel, userName, message, date, avatar };

    try {
      await dispatch(addMessage(messageData));
    } catch (e) {
      setStatus(t('errors.network'));
    }
    resetForm();
  };

  const f = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <form className="sender" onSubmit={f.handleSubmit}>
      <input
        name="message"
        type="text"
        placeholder={t('placeholder.message')}
        onChange={f.handleChange}
        value={f.values.message}
        isInvalid={!!f.status}
        disabled={f.isSubmitting}
        ref={inputRef}
      />

      <button type="submit">Отправить</button>
    </form>
  );
};

export default MessageInput;

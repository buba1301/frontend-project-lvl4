import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button, Modal } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useForm } from '@mantine/hooks';
import setCurrentUserCookie from '../../utils/user';

import { asyncActions, actions } from '../../slices/index.js';

import './styles.css';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const ModalDialog = ({ opened, setOpened }) => {
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  const activeChannel = useSelector((state) => state.activeChannel);

  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: '',
    },

    validationRules: {
      name: (value) => value.trim().length >= 3,
    },
  });

  const handleSubmit = async ({ name }) => {
    console.log('ModalDialog', name);

    try {
      await dispatch(asyncActions.addChannel({ name }));
      setOpened(false);
    } catch (e) {
      setStatus(t('errors.network'));
    }
  };

  const handleChange = (event) => form.setFieldValue('name', event.currentTarget.value);

  const handleFocus = () => {
    setError(null);
    form.setFieldError('name', false);
  };

  return (
    <Modal
      styles={{
        modal: { backgroundColor: '#1b1c23' },
        title: { color: 'white' },
      }}
      title={t('modal.add.header')}
      opened={opened}
      onClose={() => setOpened(false)}
      overlayOpacity={0.5}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          styles={{
            input: { backgroundColor: '#1b1c23', color: 'white' },
            label: { color: 'white' },
          }}
          required
          label="Channel name"
          value={form.values.email}
          onChange={handleChange}
          onFocus={handleFocus}
          error={form.errors.name && (error || 'Channel name most be longer then 3 length')}
        />

        <Button
          styles={{
            root: { backgroundColor: '#7045ff' },
          }}
          className="button"
          type="submit"
        >
          {t('button.adding')}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalDialog;

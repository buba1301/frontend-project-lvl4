import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button, Modal, Checkbox } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useForm } from '@mantine/hooks';

import { asyncActions, actions } from '../../slices/index';

import './styles.css';

const ModalDialog = ({ opened, setOpened, modalType }) => {
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  const activeChannel = useSelector((state) => state.activeChannel);

  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: '',
      id: '',
      termsOfService: false,
    },

    validationRules: {
      name: (value) => value.trim().length >= 3,
    },
  });

  const handleSubmitAdd = async ({ name }) => {
    try {
      await dispatch(asyncActions.addChannel({ name }));
      setOpened(false);
      form.setFieldValue('name', '');
    } catch (e) {
      setError(t('errors.network'));
    }
  };

  const handleSubmitRename = async ({ name }) => {
    try {
      await dispatch(asyncActions.renameChannel({ name, currentId: activeChannel }));
      setOpened(false);
      form.setFieldValue('name', '');
    } catch (e) {
      setError(t('errors.network'));
    }
  };

  const handleRemove = async ({ id }) => {
    try {
      await dispatch(asyncActions.removeChannel({ id }));
      actions.setActiveChannel('channel_1');
      setOpened(false);
      form.setFieldValue('termsOfService', false);
    } catch (e) {
      // setStatus(t('errors.network'));
    }
  };

  const handleChangeInput = (event) => form.setFieldValue('name', event.currentTarget.value);

  const handleFocus = () => {
    setError(null);
    form.setFieldError('name', false);
  };

  const handleChangeCheckBox = (event) => {
    form.setFieldValue('termsOfService', event.currentTarget.checked);
    form.setFieldValue('id', event.currentTarget.id);
  };

  const onSubmitForm = {
    add: handleSubmitAdd,
    remove: handleRemove,
    rename: handleSubmitRename,
  };

  return (
    <Modal
      styles={{
        modal: { backgroundColor: '#1b1c23' },
        title: { color: 'white' },
      }}
      title={t(`modal.${modalType}.header`)}
      opened={opened}
      onClose={() => setOpened(false)}
      overlayOpacity={0.5}
    >
      <form onSubmit={form.onSubmit(onSubmitForm[modalType])}>
        {modalType !== 'remove' ? (
          <TextInput
            styles={{
              input: { backgroundColor: '#1b1c23', color: 'white' },
              label: { color: 'white' },
            }}
            required
            label="Channel name"
            value={form.values.name}
            onChange={handleChangeInput}
            onFocus={handleFocus}
            error={form.errors.name && (error || 'Channel name most be longer then 3 length')}
          />
        ) : (
          <Checkbox
            required
            styles={{ root: { marginTop: 20 }, label: { color: 'white' } }}
            label={t(`modal.${modalType}.text`)}
            checked={form.values.termsOfService}
            onChange={handleChangeCheckBox}
            id={activeChannel}
          />
        )}

        <Button
          styles={{
            root: { backgroundColor: '#7045ff' },
          }}
          className="button"
          type="submit"
        >
          {t(`button.${modalType}`)}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalDialog;

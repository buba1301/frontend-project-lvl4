import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import SubmitButton from './Submit';

const renderHeaderAddModal = (t) => (
  <Modal.Header closeButton>
    <Modal.Title>{t('modal.add.header')}</Modal.Title>
  </Modal.Header>
);

const renderBodyAddModal = (channel, inputRef, t) => (
  <Modal.Body>
    <form onSubmit={channel.handleSubmit}>
      <FormGroup>
        <FormControl
          name="name"
          type="text"
          placeholder={t('placeholder.channel')}
          required
          ref={inputRef}
          onChange={channel.handleChange}
          value={channel.values.name}
          isInvalid={!!channel.status}
          disabled={channel.isSubmitting}
        />
        <FormControl.Feedback type="invalid">
          {channel.status}
        </FormControl.Feedback>
      </FormGroup>
      <SubmitButton isSubmitting={channel.isSubmitting} buttonType="Add" />
    </form>
  </Modal.Body>
);

const Add = () => {
  const { t } = useTranslation();

  const { hideModal } = actions;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const dispatch = useDispatch();

  const handleSubmit = async ({ name }, { resetForm, setStatus }) => {
    const { addChannel } = asyncActions;

    try {
      await dispatch(addChannel({ name }));
      resetForm();
      dispatch(hideModal({}));
    } catch (e) {
      setStatus(t('errors.network'));
    }
  };

  const handleModal = () => {
    dispatch(hideModal({}));
  };

  const channel = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <Modal show onHide={handleModal} centered>
      {renderHeaderAddModal(t)}
      {renderBodyAddModal(channel, inputRef, t)}
    </Modal>
  );
};
export default Add;

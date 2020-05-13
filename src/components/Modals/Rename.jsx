import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import SubmitButton from './Submit';

const renderHeaderModal = (t) => (
  <Modal.Header closeButton>
    <Modal.Title>{t('modal.rename.header')}</Modal.Title>
  </Modal.Header>
);

const renderBodyModal = (channel, inputRef, t) => (
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
      <SubmitButton isSubmitting={channel.isSubmitting} buttonType="Rename" />
    </form>
  </Modal.Body>
);

const Rename = () => {
  const { t } = useTranslation();

  const { modalInfo: { id } } = useSelector((state) => state);
  const { hideModal } = actions;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const dispatch = useDispatch();

  const handleSubmit = async ({ name }, methods) => {
    const { resetForm, setStatus } = methods;
    const { renameChannel } = asyncActions;

    try {
      await dispatch(renameChannel({ name, id }));
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
      {renderHeaderModal(t)}
      {renderBodyModal(channel, inputRef, t)}
    </Modal>
  );
};
export default Rename;

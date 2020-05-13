import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import SubmitButton from './Submit';

const renderHeaderModal = (t) => (
  <Modal.Header closeButton>
    <Modal.Title>{t('modal.remove.header')}</Modal.Title>
  </Modal.Header>
);

const renderBodyModal = (channel, t) => (
  <Modal.Body>
    <h6 className="text-dark">
      {t('modal.remove.text')}
    </h6>
    <h6 className="text-danger">
      {channel.status}
    </h6>
    <form onSubmit={channel.handleSubmit}>
      <SubmitButton isSubmitting={channel.isSubmitting} buttonType="Remove" />
    </form>
  </Modal.Body>
);

const Remove = () => {
  const { t } = useTranslation();

  const { modalInfo } = useSelector((state) => state);
  const { hideModal } = actions;

  const dispatch = useDispatch();

  const handleSubmit = async ({ id }, methods) => {
    const { resetForm, setStatus } = methods;
    const { removeChannel } = asyncActions;

    const channelData = { id };

    try {
      await dispatch(removeChannel(channelData));
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
      id: modalInfo.id,
    },
    onSubmit: handleSubmit,
  });

  return (
    <Modal show onHide={handleModal} centered>
      {renderHeaderModal(t)}
      {renderBodyModal(channel, t)}
    </Modal>
  );
};
export default Remove;

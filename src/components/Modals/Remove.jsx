import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import SubmitButton from './SubmitButton.jsx';

const Remove = () => {
  const { t } = useTranslation();

  const modalInfo = useSelector((state) => state.modalInfo);

  const dispatch = useDispatch();

  const handleSubmit = async ({ id }, { setStatus }) => {
    try {
      await dispatch(asyncActions.removeChannel({ id }));
      dispatch(actions.hideModal());
    } catch (e) {
      setStatus(t('errors.network'));
    }
  };

  const handleModal = () => dispatch(actions.hideModal());

  const channel = useFormik({
    initialValues: {
      id: modalInfo.id,
    },
    onSubmit: handleSubmit,
  });

  return (
    <Modal show onHide={handleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={channel.handleSubmit}>
          <h6 className="text-dark">{t('modal.remove.text')}</h6>
          <h6 className="text-danger">{channel.status}</h6>
          <SubmitButton isSubmitting={channel.isSubmitting} />
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;

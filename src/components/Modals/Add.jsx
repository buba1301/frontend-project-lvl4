import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import ModalHeader from './Modal.Header';
import { ModalBody } from './Modal.Body';

const Add = () => {
  const { t } = useTranslation();

  const { hideModal } = actions;

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
      <ModalHeader typeHeader="add" />
      <ModalBody channel={channel} buttonType="add" />
    </Modal>
  );
};
export default Add;

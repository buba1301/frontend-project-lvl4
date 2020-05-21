import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import ModalHeader from './Elements/ModalHeader';
import { ModalBody } from './Elements/ModalBody';

const Add = () => {
  const { t } = useTranslation();

  const { hideModal } = actions;

  const dispatch = useDispatch();

  const handleSubmit = async ({ name }, { resetForm, setStatus }) => {
    try {
      await dispatch(asyncActions.addChannel({ name }));
      dispatch(hideModal());
    } catch (e) {
      setStatus(t('errors.network'));
    }
    resetForm();
  };

  const handleModal = () => dispatch(hideModal());

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

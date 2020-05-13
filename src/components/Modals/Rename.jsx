import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import ModalHeader from './Modal.Header';
import { ModalBody } from './Modal.Body';

const Rename = () => {
  const { t } = useTranslation();

  const { modalInfo: { id } } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleSubmit = async ({ name }, { setStatus }) => {
    try {
      await dispatch(asyncActions.renameChannel({ name, id }));
      dispatch(actions.hideModal());
    } catch (e) {
      setStatus(t('errors.network'));
    }
  };

  const handleModal = () => dispatch(actions.hideModal());

  const channel = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <Modal show onHide={handleModal} centered>
      <ModalHeader typeHeader="rename" />
      <ModalBody channel={channel} buttonType="rename" />
    </Modal>
  );
};
export default Rename;

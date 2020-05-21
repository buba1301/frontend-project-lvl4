import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import ModalHeader from './Elements/ModalHeader';
import { ModalBodyRemove } from './Elements/ModalBody';

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
      <ModalHeader typeHeader="remove" />
      <ModalBodyRemove channel={channel} buttonType="remove" />
    </Modal>
  );
};
export default Remove;

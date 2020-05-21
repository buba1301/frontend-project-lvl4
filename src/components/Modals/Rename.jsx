import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import ModalHeader from './Elements/ModalHeader';
import { ModalBody } from './Elements/ModalBody';

const Rename = () => {
  const { t } = useTranslation();

  const { modalInfo, channels } = useSelector((state) => state);

  const currentId = modalInfo.id;

  const currentChannel = channels.find((channel) => channel.id === currentId);
  const currentName = currentChannel.name;

  const dispatch = useDispatch();

  const handleSubmit = async ({ name }, { setStatus }) => {
    try {
      await dispatch(asyncActions.renameChannel({ name, currentId }));
      dispatch(actions.hideModal());
    } catch (e) {
      setStatus(t('errors.network'));
    }
  };

  const handleModal = () => dispatch(actions.hideModal());

  const channel = useFormik({
    initialValues: {
      name: currentName,
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

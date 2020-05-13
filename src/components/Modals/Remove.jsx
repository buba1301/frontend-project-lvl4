import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Modal, Button, Spinner,
} from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';


const renderButton = ({ isSubmitting }, t) => {
  if (isSubmitting === false) {
    return (<Button variant="danger" type="submit">Remove</Button>);
  }
  return (
    <>
      <Button variant="danger" disabled={isSubmitting}>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="sr-only">{t('modal.spiner')}</span>
      </Button>
      {' '}
      <Button variant="danger" disabled={isSubmitting}>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {t('modal.spiner')}
      </Button>
    </>
  );
};

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
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="text-dark">
          {t('modal.remove.text')}
        </h6>
        <h6 className="text-danger">
          {channel.status}
        </h6>
        <form onSubmit={channel.handleSubmit}>
          {renderButton(channel, t)}
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;

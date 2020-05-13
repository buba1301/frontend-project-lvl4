import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Modal, FormGroup, FormControl, Button, Spinner,
} from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';


const renderButton = ({ isSubmitting }, t) => {
  if (isSubmitting === false) {
    return (<Button variant="primary" type="submit">Add</Button>);
  }
  return (
    <>
      <Button variant="primary" disabled={isSubmitting}>
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
      <Button variant="primary" disabled={isSubmitting}>
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

const Add = () => {
  const { t } = useTranslation();
  console.log('ADD', t('errors.network'));
  const { hideModal } = actions;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const dispatch = useDispatch();

  const handleSubmit = async ({ name }, methods) => {
    const { resetForm, setStatus } = methods;
    const { addChannel } = asyncActions;

    const channelData = { name };

    try {
      await dispatch(addChannel(channelData));
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
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add.header')}</Modal.Title>
      </Modal.Header>
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
          {renderButton(channel, t)}
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Add;

import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import SubmitButton from './SubmitButton.jsx';

const Rename = () => {
  const { t } = useTranslation();

  const modalInfo = useSelector((state) => state.modalInfo);
  const channels = useSelector((state) => state.channels);

  const currentId = modalInfo.id;

  const currentChannel = channels.find((channel) => channel.id === currentId);
  const currentName = currentChannel.name;

  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

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
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename.header')}</Modal.Title>
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
            <FormControl.Feedback type="invalid">{channel.status}</FormControl.Feedback>
          </FormGroup>
          <SubmitButton isSubmitting={channel.isSubmitting} />
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default Rename;

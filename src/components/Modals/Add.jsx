import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { asyncActions, actions } from '../../slices/index.js';
import SubmitButton from './SubmitButton.jsx';
import cn from 'classnames';

const Add = ({ opened }) => {
  const { t } = useTranslation();
  console.log('Add', opened);

  const { hideModal } = actions;

  const dispatch = useDispatch();

  const classNames = cn({
    show: opened,
  });

  /* const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }); */

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
    <Modal className={classNames} onHide={handleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modal.${add}.header`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={channel.handleSubmit}>
          <FormGroup>
            <FormControl
              name="name"
              type="text"
              placeholder={t('placeholder.channel')}
              required
              // ref={inputRef}
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
export default Add;

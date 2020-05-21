import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import SubmitButton from './SubmitButton';

export const ModalBodyRemove = ({ channel, buttonType }) => {
  const { t } = useTranslation();

  return (
    <Modal.Body>
      <h6 className="text-dark">
        {t('modal.remove.text')}
      </h6>
      <h6 className="text-danger">
        {channel.status}
      </h6>
      <form onSubmit={channel.handleSubmit}>
        <SubmitButton isSubmitting={channel.isSubmitting} buttonType={t(`button.${buttonType}`)} />
      </form>
    </Modal.Body>
  );
};

export const ModalBody = ({ channel, buttonType }) => {
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
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
        <SubmitButton isSubmitting={channel.isSubmitting} buttonType={t(`button.${buttonType}`)} />
      </form>
    </Modal.Body>
  );
};

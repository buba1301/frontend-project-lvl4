import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const mapButtonStyle = {
  Remove: 'danger',
  Add: 'primary',
  Rename: 'primary',
};

const getButtonStyle = (buttonType) => mapButtonStyle[buttonType];

const SubmitButton = ({ isSubmitting, buttonType }) => {
  const { t } = useTranslation();

  const { modalInfo } = useSelector((state) => state);

  const buttonStyle = getButtonStyle(buttonType);

  if (modalInfo.submitState === 'request') {
    return (
      <>
        <Button variant={buttonStyle} disabled={isSubmitting}>
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
  }
  return (
    <Button variant={buttonStyle} type="submit">
      {buttonType}
    </Button>
  );
};

export default SubmitButton;

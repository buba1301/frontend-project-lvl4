import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const SubmitButton = ({ isSubmitting, buttonType, buttonStyle }) => {
  const { t } = useTranslation();

  const { modalInfo } = useSelector((state) => state);

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

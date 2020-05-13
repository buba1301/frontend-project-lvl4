import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Spinner } from 'react-bootstrap';

const SubmitButton = ({ isSubmitting, buttonType }) => {
  const { t } = useTranslation();

  const buttonStyle = buttonType === 'Remove' ? 'danger' : 'primary';

  if (isSubmitting === false) {
    return (
      <Button variant={buttonStyle} type="submit">
        {buttonType}
      </Button>
    );
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

export default SubmitButton;

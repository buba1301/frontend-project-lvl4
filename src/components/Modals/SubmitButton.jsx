import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const mappedButtonStyle = {
  adding: 'primary',
  removing: 'danger',
  renaming: 'primary',
};

const SubmitButton = ({ isSubmitting }) => {
  const { t } = useTranslation();

  const modalInfo = useSelector((state) => state.modalInfo);

  if (modalInfo.submitState === 'request') {
    return (
      <>
        <Button variant={mappedButtonStyle[modalInfo.type]} disabled={isSubmitting}>
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
    <Button variant={mappedButtonStyle[modalInfo.type]} type="submit">
      {t(`button.${modalInfo.type}`)}
    </Button>
  );
};

export default SubmitButton;

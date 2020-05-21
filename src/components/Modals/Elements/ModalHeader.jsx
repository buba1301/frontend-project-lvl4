import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const ModalHeader = ({ typeHeader }) => {
  const { t } = useTranslation();

  return (
    <Modal.Header closeButton>
      <Modal.Title>{t(`modal.${typeHeader}.header`)}</Modal.Title>
    </Modal.Header>
  );
};

export default ModalHeader;
